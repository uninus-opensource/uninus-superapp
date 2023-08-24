"use client";
import { BreadCrumb, SelectOption, Button, UploadField } from "@uninus/web/components";
import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import { useBiodataUpdate, useScholarshipGet } from "./hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { beasiswa } from "./type";
import { useStudentData } from "@uninus/web/services";

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
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FieldValues>({
    mode: "all",
    defaultValues: {},
  });

  const [scholarship] = useState({
    search: "",
  });

  const nusantaraBerprestasi = [
    {
      label: "Sertifikat Kejuaraan",
      name: "sertifikat_kejuaraan",
      desc: "Minimal juara 3 tingkat Kabupaten/Kota",
    },
    { label: "Sertifikat Tahfidzh Qur'an", name: "tahfidzh", desc: "Minimal hafalan 3 juz" },
  ];

  const nusantaraUnggul = [
    { label: "Sertifikat Aktif Organisasi", name: "sertifikat_aktif" },
    { label: "Sertifikat Lainnya", name: "sertifikat_lainnya" },
  ];

  const mitraNusantara = [
    { label: "Bukti Anggota NU", name: "surat_anggota_nu" },
    { label: "Surat Tugas Dari Sekolah", name: "surat_tugas" },
  ];

  const beasiswaDifabel = [{ label: "Surat Keterangan Dokter", name: "suket_dokter" }];

  const { data: getScholarship } = useScholarshipGet(scholarship);

  const scholarshipOptions = useMemo(
    () =>
      getScholarship?.scholarship?.map((scholarship) => ({
        label: scholarship?.name,
        value: scholarship?.id.toString(),
      })),
    [getScholarship?.scholarship],
  );

  const [isDisabled, setIsdisabled] = useState(false);

  const { mutate } = useBiodataUpdate();

  const { getStudent } = useStudentData();

  const student = useMemo(() => {
    return getStudent;
  }, [getStudent]);

  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const onSubmit = handleSubmit((data) => {
    beasiswa.scholarship_id = Number(data.scholarship_id);

    try {
      mutate(beasiswa, {
        onSuccess: () => {
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
          setIsSubmitClicked(true);
        },
        onError: () => {
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
      setIsdisabled(true);
    } catch (error) {
      console.error(error);
    }
  });
  useEffect(() => {
    reset(student);
  }, [student, reset, getStudent]);

  const scholarsipProgram = useMemo(() => {
    return student?.scholarship_id;
  }, [student?.scholarship_id]);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const handleButtonClick = () => {
    if (isButtonDisabled) {
      return;
    }
    setIsButtonDisabled(true);
    toast.success("File Berhasil Terupload!");
  };

  return (
    <section
      key="dashboard-beasiswa"
      className="flex flex-col text-center px-4 gap-y-6 lg:text-start"
    >
      <BreadCrumb items={beasiswaBreadcrumb} />
      <h1 className="text-lg 2xl:text-2xl pt-2 font-extrabold text-secondary-green-4">
        Halaman Beasiswa
      </h1>
      <div className="flex flex-col lg:flex-row p-8 bg-primary-white shadow-lg rounded-md w-full lg:h-[180px] h-auto">
        <div className="px-20 lg:px-0">
          <Image src={"/illustrations/beasiswa.webp"} width={130} height={112} alt="mandiri" />
        </div>
        <div className="flex flex-col gap-2 h-full justify-center pl-14 items-start">
          <h1 className="text-primary-green font-extrabold text-3xl">
            Selamat {student?.fullname}
          </h1>
          <p>Anda berhak mendapatkan beasiswa di bawah ini</p>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col p-8 bg-primary-white shadow-lg rounded-md w-full lg:h-[240px] h-auto">
          <SelectOption
            labels="Pilih salah satu beasiswa yang tersedia"
            labelClassName="text-xl py-2"
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
            disabled={isDisabled || student?.scholarship_id ? true : false}
            isMulti={false}
          />
          <div className="flex w-full justify-center lg:justify-end py-8">
            <Button
              type="submit"
              variant="filled"
              size="md"
              width="w-50% lg:w-25% xl:w-15%"
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
      {isSubmitClicked && (
        <div className="flex flex-col p-8 bg-primary-white shadow-lg rounded-md w-full h-auto">
          <h1 className="text-lg lg:text-xl py-3">
            Upload Berkas Khusus <span className="text-primary-green">*</span> (Wajib Diisi)
          </h1>
          <p>Upload File Dengan Format .jpg/.png/.pdf</p>
          <form>
            <section className="flex flex-col h-auto md:items-center mt-5">
              <div className="md:w-[80vw] lg:w-[66vw] xl:w-[66vw] md:h-auto flex">
                <section className="grid grid-cols-2 gap-10 w-50% ">
                  {scholarsipProgram === 1 &&
                    nusantaraUnggul.map((documentType) => (
                      <div key={documentType.name} className="flex flex-col gap-2">
                        <h3 className="font-semibold text-xs md:text-base py-3">
                          {documentType.label}
                        </h3>
                        <UploadField
                          control={control}
                          name={documentType.name}
                          variant="custom"
                          preview={true}
                        />
                      </div>
                    ))}
                  {scholarsipProgram === 2 &&
                    nusantaraBerprestasi.map((documentType) => (
                      <div key={documentType.name} className="flex flex-col gap-2">
                        <h3 className="font-semibold text-xs md:text-base">{documentType.label}</h3>
                        <h1 className="pb-3 text-sm">{documentType.desc}</h1>
                        <UploadField
                          control={control}
                          required
                          name={documentType.name}
                          variant="custom"
                          preview={true}
                        />
                      </div>
                    ))}

                  {scholarsipProgram === 4 &&
                    mitraNusantara.map((documentType) => (
                      <div key={documentType.name} className="flex flex-col gap-2">
                        <h3 className="font-semibold text-xs md:text-base py-3">
                          {documentType.label}
                        </h3>
                        <UploadField
                          control={control}
                          name={documentType.name}
                          required
                          variant="custom"
                          preview={true}
                        />
                      </div>
                    ))}

                  {scholarsipProgram === 3 &&
                    beasiswaDifabel.map((documentType) => (
                      <div key={documentType.name} className="flex flex-col gap-2">
                        <h3 className="font-semibold text-xs md:text-base py-3">
                          {documentType.label}
                        </h3>
                        <UploadField
                          control={control}
                          name={documentType.name}
                          variant="custom"
                          preview={true}
                          required
                        />
                      </div>
                    ))}
                </section>
              </div>
            </section>
            <div className="flex w-full justify-end items-end py-4">
              <Button
                onClick={handleButtonClick}
                disabled={isButtonDisabled}
                variant="filled"
                size="md"
                width="w-50% lg:w-25% xl:w-15%"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}
      <div className="flex w-full justify-between py-8">
        <Link href="/dashboard/registrasi/biodata">
          <Button type="button" variant="filled" size="md" width="w-auto">
            <CaretLeftOutlined />
            <p className="px-2 md:flex hidden"> Data Registrasi</p>
          </Button>
        </Link>
        <Link href="/dashboard/registrasi/pembayaran/detail">
          <Button type="button" variant="filled" size="md" width="w-auto">
            <p className="px-2 md:flex hidden">Lakukan Pembayaran</p>
            <CaretRightOutlined />
          </Button>
        </Link>
      </div>
    </section>
  );
};
