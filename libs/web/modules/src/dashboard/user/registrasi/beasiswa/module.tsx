"use client";
import { BreadCrumb, SelectOption, Button, UploadField } from "@uninus/web/components";
import { FC, Fragment, ReactElement, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import { useScholarshipGet } from "./hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { berkasKhusus } from "./type";
import { useStudentData } from "@uninus/web/services";
import {
  TUploadFileRequest,
  TUploadFileResponse,
  useBiodataUpdate,
  useUploadFile,
} from "../biodata";
import { beasiswa } from "./store";
import { redirect } from "next/navigation";

export const beasiswaBreadcrumb = [
  {
    name: "Beranda",
    link: "/dashboard",
  },
  {
    name: "Registrasi",
    link: "/dashboard/registrasi/biodata",
  },
  {
    name: "Beasiswa",
    link: "/dashboard/registrasi/beasiswa",
  },
];

export const BeasiswaDashboardModule: FC = (): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);
  const [isDisabled, setIsdisabled] = useState<boolean | undefined>(undefined);
  const [isDisabledFile, setIsdisabledFile] = useState<boolean>(false);
  const [scholarshipId, setScholarshipId] = useState<number | null | undefined>(undefined);

  const { getStudent } = useStudentData();

  const selectionType = useMemo(() => {
    return getStudent?.selection_path_id;
  }, [getStudent?.selection_path_id]);

  const documents = useMemo(() => {
    return getStudent?.documents;
  }, [getStudent?.documents]);

  useEffect(() => {
    if (selectionType === 3) {
      redirect("/dashboard");
    } else if (!documents?.find((doc) => doc.name === "Kartu Keluarga")) {
      redirect("/dashboard");
    }
  }, [selectionType, documents]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FieldValues>({
    mode: "all",
  });

  const {
    control: controlBeasiswa,
    handleSubmit: handleSubmitBeasiswa,
    watch,
  } = useForm<berkasKhusus>({
    mode: "all",
  });

  const [scholarship] = useState({
    search: "",
  });

  const { data: getScholarship } = useScholarshipGet(scholarship);

  const scholarshipOptions = useMemo(
    () =>
      getScholarship?.scholarship?.map((scholarship) => ({
        label: scholarship?.name,
        value: scholarship?.id.toString(),
      })),
    [getScholarship?.scholarship],
  );

  const { mutate } = useBiodataUpdate();
  const { mutate: upload } = useUploadFile();

  const student = useMemo(() => {
    return getStudent;
  }, [getStudent]);

  const uploadFile = async (payload: TUploadFileRequest): Promise<TUploadFileResponse> => {
    return new Promise((resolve, reject) => {
      upload(payload, {
        onSuccess: (file) => resolve(file),
        onError: (error) => reject(error),
      });
    });
  };

  const onSubmit = handleSubmit((data) => {
    beasiswa.scholarship_id = Number(data?.scholarship_id);

    try {
      setIsLoading(true);
      mutate(beasiswa, {
        onSuccess: () => {
          setIsLoading(false);
          setIsdisabled(true);
          setScholarshipId(beasiswa.scholarship_id);
          setTimeout(() => {
            toast.success("Berhasil Memilih Beasiswa", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }, 500);
        },
        onError: () => {
          setIsLoading(false);
          setTimeout(() => {
            toast.error("Gagal Memilih Beasiswa", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }, 500);
        },
      });
    } catch (error) {
      console.error(error);
    }
  });

  const onSubmitBeasiswa = handleSubmitBeasiswa(async (data) => {
    try {
      setIsLoadingFile(true);

      if (student?.scholarship_id === 1) {
        const { file_url: sertifikat_aktif } = await uploadFile({
          file: data.sertifikat_aktif,
        });
        const { file_url: sertifikat_lainnya } = await uploadFile({
          file: data.sertifikat_lainnya,
        });

        mutate(
          {
            documents: [
              { name: "Sertifikat Aktif Organisasi", path: sertifikat_aktif },
              { name: "Sertifikat Lainnya", path: sertifikat_lainnya },
            ],
          },
          {
            onSuccess: () => {
              setIsdisabledFile(true);
              setIsLoadingFile(false);
              setTimeout(() => {
                toast.success("Berhasil Upload File", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }, 500);
            },
            onError: () => {
              setIsLoadingFile(false);
              setTimeout(() => {
                toast.error("Gagal Upload File", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }, 500);
            },
          },
        );
      } else if (student?.scholarship_id === 2) {
        const { file_url: sertifikat_kejuaraan } = await uploadFile({
          file: data.sertifikat_kejuaraan,
        });
        const { file_url: tahfidzh } = await uploadFile({
          file: data.tahfidzh,
        });

        mutate(
          {
            documents: [
              { name: "Sertifikat Kejuaraan", path: sertifikat_kejuaraan },
              { name: "Tahfizh", path: tahfidzh },
            ],
          },
          {
            onSuccess: () => {
              setIsdisabledFile(true);
              setIsLoadingFile(false);
              setScholarshipId(beasiswa.scholarship_id);
              setTimeout(() => {
                toast.success("Berhasil Upload File", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }, 500);
            },
            onError: () => {
              setIsLoadingFile(false);
              setTimeout(() => {
                toast.error("Gagal Upload File", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }, 500);
            },
          },
        );
      } else if (student?.scholarship_id === 3) {
        const { file_url: surat_dokter } = await uploadFile({
          file: data.surat_dokter,
        });

        mutate(
          {
            documents: [{ name: "Surat Dokter", path: surat_dokter }],
          },
          {
            onSuccess: () => {
              setIsdisabledFile(true);
              setIsLoadingFile(false);
              setTimeout(() => {
                toast.success("Berhasil Upload File", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }, 500);
            },
            onError: () => {
              setIsLoadingFile(false);
              setTimeout(() => {
                toast.error("Gagal Upload File", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }, 500);
            },
          },
        );
      } else if (student?.scholarship_id === 4) {
        const { file_url: surat_anggota_nu } = await uploadFile({
          file: data.surat_anggota_nu,
        });
        const { file_url: surat_tugas } = await uploadFile({
          file: data.surat_tugas,
        });

        mutate(
          {
            documents: [
              { name: "Surat Anggota NU", path: surat_anggota_nu },
              { name: "Surat Tugas", path: surat_tugas },
            ],
          },
          {
            onSuccess: () => {
              setIsdisabledFile(true);
              setIsLoadingFile(false);
              setTimeout(() => {
                toast.success("Berhasil Upload File", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }, 500);
            },
            onError: () => {
              setIsLoadingFile(false);
              setTimeout(() => {
                toast.error("Gagal Upload File", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }, 500);
            },
          },
        );
      }
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    reset(student);
  }, [student, reset]);

  useEffect(() => {
    setScholarshipId(student?.scholarship_id);
  }, [student?.scholarship_id]);

  return (
    <section
      key="dashboard-beasiswa"
      className="flex flex-col text-center px-4 gap-y-6 lg:text-start"
    >
      <BreadCrumb items={beasiswaBreadcrumb} />
      <h1 className="text-lg 2xl:text-2xl pt-2 font-extrabold text-secondary-green-4">
        Halaman Beasiswa
      </h1>
      <div className="flex flex-col lg:flex-row md:flex-row p-8 bg-primary-white shadow-lg rounded-md w-full lg:h-[180px] sm:h-auto items-center lg:items-start">
        <div>
          <Image src={"/illustrations/beasiswa.webp"} width={130} height={112} alt="mandiri" />
        </div>
        <div className="flex flex-col gap-2 h-full justify-center lg:pl-14 md:pl-8 pl-2 lg:items-start md:items-start sm:items-center">
          <h1 className="text-primary-green font-extrabold lg:text-3xl md:text-2xl">
            Selamat {student?.fullname}
          </h1>
          <p className="lg:text-lg md:text-lg text-xs">
            Anda berhak mendapatkan beasiswa di bawah ini
          </p>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col p-8 bg-primary-white shadow-lg rounded-md w-full lg:h-[240px] h-auto">
          <SelectOption
            labels="Pilih salah satu beasiswa yang tersedia"
            labelClassName="lg:text-xl text-sm py-2"
            className="shadow-md bg-slate-4 rounded-md text-primary-black w-full"
            placeholder={
              student?.scholarship_id
                ? getScholarship?.scholarship?.find(
                    (scholarship) => scholarship.id === student?.scholarship_id,
                  )?.name
                : "Pilih Beasiswa"
            }
            options={scholarshipOptions || []}
            isClearable={false}
            isSearchable={false}
            name="scholarship_id"
            control={control}
            required={true}
            disabled={isDisabled || !!student?.scholarship_id || undefined}
            isMulti={false}
          />
          <div className="flex w-full justify-center lg:justify-end py-8">
            <Button
              type="submit"
              variant="filled"
              size="md"
              width="w-50% lg:w-25% xl:w-15%"
              loading={isLoading}
              disabled={isDisabled || student?.scholarship_id ? true : false}
              className={`${
                isValid ? "bg-primary-green" : "bg-slate-2 cursor-not-allowed"
              } text-white rounded-md`}
            >
              Submit
            </Button>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        </div>
      </form>

      <div className="flex flex-col p-8 bg-primary-white shadow-lg rounded-md w-full h-auto">
        <h1 className="text-md lg:text-xl py-3">
          Upload Berkas Khusus <span className="text-primary-green">*</span> (Wajib Diisi)
        </h1>
        <p className="text-md sm:text-xs">Upload File Dengan Format .jpg/.png/.pdf</p>
        <form>
          <section className="flex flex-col h-auto mt-5">
            <div className="md:w-full lg:w-[66vw] xl:w-[66vw] md:h-auto flex">
              <section className="flex gap-10 w-50% ">
                {scholarshipId === 1 && (
                  <Fragment>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold text-xs md:text-base py-3">
                        Sertifikat Aktif Organisasi
                      </h3>
                      <UploadField
                        control={controlBeasiswa}
                        name="sertifikat_aktif"
                        inputLabel="Pilih File"
                        labelClassName={
                          watch("sertifikat_aktif")
                            ? "labelTextUploaded"
                            : student?.documents?.find(
                                (doc) => doc.name === "Sertifikat Aktif Organisasi",
                              )
                            ? "labelTextDisabled"
                            : "labelText"
                        }
                        variant="custom"
                        preview={false}
                        isDisabled={
                          !!student?.documents?.find(
                            (doc) => doc.name === "Sertifikat Aktif Organisasi",
                          )
                        }
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold text-xs md:text-base py-3">
                        Sertifikat Lainnya
                      </h3>
                      <UploadField
                        control={controlBeasiswa}
                        name="sertifikat_lainnya"
                        inputLabel="Pilih File"
                        labelClassName={
                          watch("sertifikat_lainnya")
                            ? "labelTextUploaded"
                            : student?.documents?.find((doc) => doc.name === "Sertifikat Lainnya")
                            ? "labelTextDisabled"
                            : "labelText"
                        }
                        variant="custom"
                        preview={false}
                        isDisabled={
                          !!student?.documents?.find((doc) => doc.name === "Sertifikat Lainnya")
                        }
                      />
                    </div>
                  </Fragment>
                )}
                {scholarshipId === 2 && (
                  <Fragment>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold text-xs md:text-base">Sertifikat Kejuaraan</h3>
                      <h4 className="pb-3 text-sm">Minimal juara 3 tingkat Kabupaten/Kota</h4>
                      <UploadField
                        control={controlBeasiswa}
                        required
                        name="sertifikat_kejuaraan"
                        inputLabel="Pilih File"
                        labelClassName={
                          watch("sertifikat_kejuaraan")
                            ? "labelTextUploaded"
                            : student?.documents?.find((doc) => doc.name === "Sertifikat Kejuaraan")
                            ? "labelTextDisabled"
                            : "labelText"
                        }
                        variant="custom"
                        preview={false}
                        isDisabled={
                          !!student?.documents?.find((doc) => doc.name === "Sertifikat Kejuaraan")
                        }
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold text-xs md:text-base">
                        Sertifikat Tahfidzh Qur'an
                      </h3>
                      <h4 className="pb-3 text-sm">Minimal hafalan 3 juz</h4>
                      <UploadField
                        control={controlBeasiswa}
                        required
                        inputLabel="Pilih File"
                        name="tahfidzh"
                        labelClassName={
                          watch("tahfidzh")
                            ? "labelTextUploaded"
                            : student?.documents?.find((doc) => doc.name === "Tahfidzh")
                            ? "labelTextDisabled"
                            : "labelText"
                        }
                        variant="custom"
                        preview={false}
                        isDisabled={!!student?.documents?.find((doc) => doc.name === "Tahfidzh")}
                      />
                    </div>
                  </Fragment>
                )}

                {scholarshipId === 3 && (
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-xs md:text-base py-3">
                      Surat Keterangan Dokter
                    </h3>
                    <UploadField
                      control={controlBeasiswa}
                      inputLabel="Pilih File"
                      name="surat_dokter"
                      labelClassName={
                        watch("surat_dokter")
                          ? "labelTextUploaded"
                          : student?.documents?.find((doc) => doc.name === "Surat Dokter")
                          ? "labelTextDisabled"
                          : "labelText"
                      }
                      preview={false}
                      variant="custom"
                      isDisabled={!!student?.documents?.find((doc) => doc.name === "Surat Dokter")}
                    />
                  </div>
                )}

                {scholarshipId === 4 && (
                  <Fragment>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold text-xs md:text-base py-3">Bukti Anggota NU</h3>
                      <UploadField
                        control={controlBeasiswa}
                        name="surat_anggota_nu"
                        inputLabel="Pilih File"
                        labelClassName={
                          watch("surat_anggota_nu")
                            ? "labelTextUploaded"
                            : student?.documents?.find((doc) => doc.name === "Surat Anggota NU")
                            ? "labelTextDisabled"
                            : "labelText"
                        }
                        variant="custom"
                        preview={false}
                        isDisabled={
                          !!student?.documents?.find((doc) => doc.name === "Surat Anggota NU")
                        }
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold text-xs md:text-base py-3">
                        Surat Tugas Dari Sekolah
                      </h3>
                      <UploadField
                        control={controlBeasiswa}
                        name="surat_tugas"
                        inputLabel="Pilih File"
                        labelClassName={
                          watch("surat_tugas")
                            ? "labelTextUploaded"
                            : student?.documents?.find((doc) => doc.name === "Surat Tugas")
                            ? "labelTextDisabled"
                            : "labelText"
                        }
                        variant="custom"
                        preview={false}
                        isDisabled={!!student?.documents?.find((doc) => doc.name === "Surat Tugas")}
                      />
                    </div>
                  </Fragment>
                )}
              </section>
            </div>
          </section>
          <div className="flex w-full justify-end items-end py-4">
            <Button
              onClick={onSubmitBeasiswa}
              variant="filled"
              size="md"
              width="w-50% lg:w-25% xl:w-15%"
              loading={isLoadingFile}
              disabled={
                student?.scholarship_id === 1
                  ? watch("sertifikat_aktif") && watch("sertifikat_lainnya")
                    ? false
                    : true
                  : student?.scholarship_id === 2
                  ? watch("sertifikat_kejuaraan") && watch("tahfidzh")
                    ? false
                    : true
                  : student?.scholarship_id === 3
                  ? watch("surat_dokter")
                    ? false
                    : true
                  : student?.scholarship_id === 4
                  ? watch("surat_anggota_nu") && watch("surat_tugas")
                    ? false
                    : true
                  : false || isDisabledFile
              }
            >
              Submit
            </Button>
          </div>
        </form>
      </div>

      <div className="flex w-full justify-between py-8">
        <Button
          href="/dashboard/registrasi/biodata"
          type="button"
          variant="filled"
          size="md"
          width="w-auto"
        >
          <CaretLeftOutlined />
          <p className="px-2 md:flex hidden"> Data Registrasi</p>
        </Button>

        <Button
          href="/dashboard/registrasi/pembayaran/detail"
          type="button"
          variant="filled"
          size="md"
          width="w-auto"
        >
          <p className="px-2 md:flex hidden">Lakukan Pembayaran</p>
          <CaretRightOutlined />
        </Button>
      </div>
    </section>
  );
};
