import { Accordion, Button, RadioButton } from "@uninus/web/components";
import { useStudentDataByIdValidation } from "@uninus/web/services";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, Fragment, MouseEvent, ReactElement, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useBiodataUpdateById } from "../../../edit-data-pendaftar/hooks";
import { ToastContainer, toast } from "react-toastify";

export const BerkasKhusus: FC = (): ReactElement => {
  const { getStudentbyId } = useStudentDataByIdValidation();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isSertifikatAktif, setIsSertifikatAktif] = useState<string | null>(null);
  const [isSertifikatLain, setIsSertifikatLain] = useState<string | null>(null);
  const [isSertifikatKejuaraan, setIsSertifikatKejuaraan] = useState<string | null>(null);
  const [isTahfizh, setIsTahfizh] = useState<string | null>(null);
  const [isSuratDokter, setIsSuratDokter] = useState<string | null>(null);
  const [isSuratAnggotaNu, setIsSuratAnggotaNu] = useState<string | null>(null);
  const [isSuratTugas, setIsSuratTugas] = useState<string | null>(null);

  const path = usePathname();
  const id = path.split("/")[4];

  const documents = useMemo(() => {
    return getStudentbyId?.documents;
  }, [getStudentbyId]);

  const scholarship = useMemo(() => {
    return getStudentbyId?.scholarship_id;
  }, [getStudentbyId]);

  const { control, handleSubmit, setValue } = useForm({
    mode: "all",
  });

  const sertifikat_aktif = documents?.find((doc) => doc.name === "Sertifikat Aktif Organisasi");
  const sertifikat_lainnya = documents?.find((doc) => doc.name === "Sertifikat Lainnya");
  const sertifikat_kejuaraan = documents?.find((doc) => doc.name === "Sertifkat Kejuaraan");
  const tahfizh = documents?.find((doc) => doc.name === "Tahfizh");
  const surat_dokter = documents?.find((doc) => doc.name === "Surat Dokter");
  const surat_anggota_nu = documents?.find((doc) => doc.name === "Surat Anggota NU");
  const surat_tugas = documents?.find((doc) => doc.name === "Surat Tugas");

  const download = (e: MouseEvent<HTMLButtonElement>, url: string) => {
    e.preventDefault();
    window.open(url, "_blank");
  };

  const { mutate } = useBiodataUpdateById(id);
  useEffect(() => {
    if (sertifikat_aktif?.isVerified) {
      setIsSertifikatAktif("Ya");
    } else {
      setIsSertifikatAktif("Tidak");
    }
  }, [sertifikat_aktif]);
  useEffect(() => {
    if (isSertifikatAktif === "Ya") {
      setValue("sertifikat_aktif", true);
    } else {
      setValue("sertifikat_aktif", false);
    }
  }, [isSertifikatAktif, setValue]);
  useEffect(() => {
    if (sertifikat_lainnya?.isVerified) {
      setIsSertifikatLain("Ya");
    } else {
      setIsSertifikatLain("Tidak");
    }
  }, [sertifikat_lainnya]);
  useEffect(() => {
    if (isSertifikatLain === "Ya") {
      setValue("sertifikat_lainnya", true);
    } else {
      setValue("sertifikat_lainnya", false);
    }
  }, [isSertifikatLain, setValue]);
  useEffect(() => {
    if (sertifikat_kejuaraan?.isVerified) {
      setIsSertifikatKejuaraan("Ya");
    } else {
      setIsSertifikatKejuaraan("Tidak");
    }
  }, [sertifikat_kejuaraan]);
  useEffect(() => {
    if (isSertifikatKejuaraan === "Ya") {
      setValue("sertifikat_kejuaraan", true);
    } else {
      setValue("sertifikat_kejuaraan", false);
    }
  }, [isSertifikatKejuaraan, setValue]);
  useEffect(() => {
    if (tahfizh?.isVerified) {
      setIsTahfizh("Ya");
    } else {
      setIsTahfizh("Tidak");
    }
  }, [tahfizh]);
  useEffect(() => {
    if (isTahfizh === "Ya") {
      setValue("tahfizh", true);
    } else {
      setValue("tahfizh", false);
    }
  }, [isTahfizh, setValue]);
  useEffect(() => {
    if (surat_dokter?.isVerified) {
      setIsSuratDokter("Ya");
    } else {
      setIsSuratDokter("Tidak");
    }
  }, [surat_dokter]);
  useEffect(() => {
    if (isSuratDokter === "Ya") {
      setValue("surat_dokter", true);
    } else {
      setValue("surat_dokter", false);
    }
  }, [isSuratDokter, setValue]);
  useEffect(() => {
    if (surat_anggota_nu?.isVerified) {
      setIsSuratAnggotaNu("Ya");
    } else {
      setIsSuratAnggotaNu("Tidak");
    }
  }, [surat_anggota_nu]);
  useEffect(() => {
    if (isSuratAnggotaNu === "Ya") {
      setValue("surat_anggota_nu", true);
    } else {
      setValue("surat_anggota_nu", false);
    }
  }, [isSuratAnggotaNu, setValue]);
  useEffect(() => {
    if (surat_tugas?.isVerified) {
      setIsSuratTugas("Ya");
    } else {
      setIsSuratTugas("Tidak");
    }
  }, [surat_tugas]);
  useEffect(() => {
    if (isSuratTugas === "Ya") {
      setValue("surat_tugas", true);
    } else {
      setValue("surat_tugas", false);
    }
  }, [isSuratTugas, setValue]);
  const onSubmit = handleSubmit((data) => {
    try {
      if (scholarship === 1) {
        mutate(
          {
            documents: [
              { id: sertifikat_aktif?.id, isVerified: data?.sertifikat_aktif },
              { id: sertifikat_lainnya?.id, isVerified: data?.sertifikat_lainnya },
            ],
          },
          {
            onSuccess: () => {
              setIsDisabled(true);
              setTimeout(() => {
                toast.success("Data Berhasil Diverifikasi", {
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
              setTimeout(() => {
                toast.error("Data Gagal Diverifikasi", {
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
      } else if (scholarship === 2) {
        mutate(
          {
            documents: [
              { id: sertifikat_kejuaraan?.id, isVerified: data?.sertifikat_kejuaraan },
              { id: tahfizh?.id, isVerified: data?.tahfizh },
            ],
          },
          {
            onSuccess: () => {
              setIsDisabled(true);

              setTimeout(() => {
                toast.success("Data Berhasil Diverifikasi", {
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
              setTimeout(() => {
                toast.error("Data Gagal Diverifikasi", {
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
      } else if (scholarship === 3) {
        mutate(
          {
            documents: [{ id: surat_dokter?.id, isVerified: data?.surat_dokter }],
          },
          {
            onSuccess: () => {
              setIsDisabled(true);

              setTimeout(() => {
                toast.success("Data Berhasil Diverifikasi", {
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
              setTimeout(() => {
                toast.error("Data Gagal Diverifikasi", {
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
      } else if (scholarship === 4) {
        mutate(
          {
            documents: [
              { id: surat_anggota_nu?.id, isVerified: data?.surat_anggota_nu },
              { id: surat_tugas?.id, isVerified: data?.surat_tugas },
            ],
          },
          {
            onSuccess: () => {
              setIsDisabled(true);

              setTimeout(() => {
                toast.success("Data Berhasil Diverifikasi", {
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
              setTimeout(() => {
                toast.error("Data Gagal Diverifikasi", {
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

  return (
    <Accordion
      title="Berkas Khusus (Beasiswa)"
      key="berkas-khusus-section"
      titleClassName="lg:text-lg text-md font-extrabold text-secondary-green-4"
      className="w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline lg:ml-[3vw] xl:ml-[1.5vw] pb-6 md:pb-0 overflow-y-hidden"
    >
      <form
        onSubmit={onSubmit}
        className="w-full md:w-[85%] flex flex-col gap-5 bg-primary-white py-4 px-4 md:px-8 text-sm md:text-lg"
      >
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* 1 */}
        {scholarship === 1 && (
          <Fragment>
            <section className="w-full flex items-center justify-between mt-8 md:mt-0 text-xs md:text-lg">
              <div className=" flex flex-col gap-2 items-start">
                <h3 className="font-bold text-left">Sertifikat Aktif Organisasi</h3>
                <div className="w-full flex flex-col md:flex-row gap-2">
                  <Link
                    href={`${sertifikat_aktif?.path}`}
                    className="text-primary-green underline truncate w-[10em] md:w-[18em]"
                    target="_blank"
                  >
                    {sertifikat_aktif?.path.split("/")[4].slice(10)}
                  </Link>
                  <Button
                    onClick={(e) => download(e, `${sertifikat_aktif?.path}`)}
                    size="sm"
                    height="h-8"
                    variant="filled"
                  >
                    Download
                  </Button>
                </div>
              </div>

              <div className="font-bold  flex flex-col gap-4 items-end md:items-start">
                <h3>Sudah Sesuai?</h3>
                <div className="flex flex-row">
                  <RadioButton
                    name="sertifikat_aktif"
                    label="Ya"
                    size="sm"
                    options={[
                      { label: "Ya", value: "Ya" },
                      {
                        label: "Tidak",
                        value: "Tidak",
                      },
                    ]}
                    variant="primary"
                    labelSize="sm"
                    control={control}
                    buttonValue={isSertifikatAktif}
                    onChange={(e) => setIsSertifikatAktif(e.target.value)}
                  />
                </div>
              </div>
            </section>

            <section className="w-full flex items-center justify-between mt-8 md:mt-0">
              <div className=" flex flex-col gap-2 items-start">
                <h3 className="font-bold">Sertifikat Lainnya</h3>
                <div className="w-full flex flex-col md:flex-row gap-2">
                  <Link
                    href={`${sertifikat_lainnya?.path}`}
                    className="text-primary-green underline truncate w-[10em] md:w-[18em]"
                    target="_blank"
                  >
                    {sertifikat_lainnya?.path.split("/")[4].slice(10)}
                  </Link>
                  <Button
                    onClick={(e) => download(e, `${sertifikat_lainnya?.path}`)}
                    size="sm"
                    height="h-8"
                    variant="filled"
                  >
                    Download
                  </Button>
                </div>
              </div>

              <div className="font-bold  flex flex-col gap-4 items-end md:items-start">
                <h3>Sudah Sesuai?</h3>
                <div className="flex flex-row">
                  <RadioButton
                    name="sertifikat_lainnya"
                    label="Ya"
                    size="sm"
                    options={[
                      { label: "Ya", value: "Ya" },
                      {
                        label: "Tidak",
                        value: "Tidak",
                      },
                    ]}
                    variant="primary"
                    labelSize="sm"
                    control={control}
                    buttonValue={isSertifikatLain}
                    onChange={(e) => setIsSertifikatLain(e.target.value)}
                  />
                </div>
              </div>
            </section>
          </Fragment>
        )}

        {/* 2 */}
        {scholarship === 2 && (
          <Fragment>
            <section className="w-full flex items-center justify-between mt-8 md:mt-0">
              <div className=" flex flex-col gap-2 items-start">
                <h3 className="font-bold">Sertifikat Kejuaraan</h3>
                <div className="w-full flex flex-col md:flex-row gap-2">
                  <Link
                    href={`${sertifikat_kejuaraan?.path}`}
                    className="text-primary-green underline truncate w-[10em] md:w-[18em]"
                    target="_blank"
                  >
                    {sertifikat_kejuaraan?.path.split("/")[4].slice(10)}
                  </Link>
                  <Button
                    onClick={(e) => download(e, `${sertifikat_kejuaraan?.path}`)}
                    size="sm"
                    height="h-8"
                    variant="filled"
                  >
                    Download
                  </Button>
                </div>
              </div>

              <div className="font-bold  flex flex-col gap-4 items-end md:items-start">
                <h3>Sudah Sesuai?</h3>
                <div className="flex flex-row">
                  <RadioButton
                    name="sertifikat_kejuaraan"
                    label="Ya"
                    size="sm"
                    options={[
                      { label: "Ya", value: "Ya" },
                      {
                        label: "Tidak",
                        value: "Tidak",
                      },
                    ]}
                    variant="primary"
                    labelSize="sm"
                    control={control}
                    buttonValue={isSertifikatKejuaraan}
                    onChange={(e) => setIsSertifikatKejuaraan(e.target.value)}
                  />
                </div>
              </div>
            </section>

            <section className="w-full flex items-center justify-between mt-8 md:mt-0">
              <div className=" flex flex-col gap-2 items-start">
                <h3 className="font-bold">Sertifikat Tahfizh Qur'an</h3>
                <div className="w-full flex flex-col md:flex-row gap-2">
                  <Link
                    href={`${tahfizh?.path}`}
                    className="text-primary-green underline truncate w-[10em] md:w-[18em]"
                    target="_blank"
                  >
                    {tahfizh?.path.split("/")[4].slice(10)}
                  </Link>
                  <Button
                    onClick={(e) => download(e, `${tahfizh?.path}`)}
                    size="sm"
                    height="h-8"
                    variant="filled"
                  >
                    Download
                  </Button>
                </div>
              </div>

              <div className="font-bold  flex flex-col gap-4 items-end md:items-start">
                <h3>Sudah Sesuai?</h3>
                <div className="flex flex-row">
                  <RadioButton
                    name="tahfizh"
                    label="Ya"
                    size="sm"
                    options={[
                      { label: "Ya", value: "Ya" },
                      {
                        label: "Tidak",
                        value: "Tidak",
                      },
                    ]}
                    variant="primary"
                    labelSize="sm"
                    control={control}
                    buttonValue={isTahfizh}
                    onChange={(e) => setIsTahfizh(e.target.value)}
                  />
                </div>
              </div>
            </section>
          </Fragment>
        )}

        {/* 3 */}
        {scholarship === 3 && (
          <section className="w-full flex items-center justify-between mt-8 md:mt-0">
            <div className=" flex flex-col gap-2 items-start">
              <h3 className="font-bold">Surat Keterangan Dokter</h3>
              <div className="w-full flex flex-col md:flex-row gap-2">
                <Link
                  href={`${surat_dokter?.path}`}
                  className="text-primary-green underline truncate w-[10em] md:w-[18em]"
                  target="_blank"
                >
                  {surat_dokter?.path.split("/")[4].slice(10)}
                </Link>
                <Button
                  onClick={(e) => download(e, `${surat_dokter?.path}`)}
                  size="sm"
                  height="h-8"
                  variant="filled"
                >
                  Download
                </Button>
              </div>
            </div>

            <div className="font-bold  flex flex-col gap-4 items-end md:items-start">
              <h3>Sudah Sesuai?</h3>
              <div className="flex flex-row">
                <RadioButton
                  name="surat_dokter"
                  label="Ya"
                  size="sm"
                  options={[
                    { label: "Ya", value: "Ya" },
                    {
                      label: "Tidak",
                      value: "Tidak",
                    },
                  ]}
                  variant="primary"
                  labelSize="sm"
                  control={control}
                  buttonValue={isSuratDokter}
                  onChange={(e) => setIsSuratDokter(e.target.value)}
                />
              </div>
            </div>
          </section>
        )}

        {/* 4 */}
        {scholarship === 4 && (
          <Fragment>
            <section className="w-full flex items-center justify-between mt-8 md:mt-0">
              <div className=" flex flex-col gap-2 items-start">
                <h3 className="font-bold">Bukti Anggota NU</h3>
                <div className="w-full flex flex-col md:flex-row gap-2">
                  <Link
                    href={`${surat_anggota_nu?.path}`}
                    className="text-primary-green underline truncate w-[10em] md:w-[18em]"
                    target="_blank"
                  >
                    {surat_anggota_nu?.path.split("/")[4].slice(10)}
                  </Link>
                  <Button
                    onClick={(e) => download(e, `${surat_anggota_nu?.path}`)}
                    size="sm"
                    height="h-8"
                    variant="filled"
                  >
                    Download
                  </Button>
                </div>
              </div>

              <div className="font-bold  flex flex-col gap-4 items-end md:items-start">
                <h3>Sudah Sesuai?</h3>
                <div className="flex flex-row">
                  <RadioButton
                    name="surat_anggota_nu"
                    label="Ya"
                    size="sm"
                    options={[
                      { label: "Ya", value: "Ya" },
                      {
                        label: "Tidak",
                        value: "Tidak",
                      },
                    ]}
                    variant="primary"
                    labelSize="sm"
                    control={control}
                    buttonValue={isSuratAnggotaNu}
                    onChange={(e) => setIsSuratAnggotaNu(e.target.value)}
                  />
                </div>
              </div>
            </section>

            <section className="w-full flex items-center justify-between mt-8 md:mt-0">
              <div className=" flex flex-col gap-2 items-start">
                <h3 className="font-bold">Surat Tugas Dari Sekolah</h3>
                <div className="w-full flex flex-col md:flex-row gap-2">
                  <Link
                    href={`${surat_tugas?.path}`}
                    className="text-primary-green underline truncate w-[10em] md:w-[18em]"
                    target="_blank"
                  >
                    {surat_tugas?.path.split("/")[4].slice(10)}
                  </Link>
                  <Button
                    onClick={(e) => download(e, `${surat_tugas?.path}`)}
                    size="sm"
                    height="h-8"
                    variant="filled"
                  >
                    Download
                  </Button>
                </div>
              </div>

              <div className="font-bold  flex flex-col gap-4 items-end md:items-start">
                <h3>Sudah Sesuai?</h3>
                <div className="flex flex-row">
                  <RadioButton
                    name="surat_tugas"
                    label="Ya"
                    size="sm"
                    options={[
                      { label: "Ya", value: "Ya" },
                      {
                        label: "Tidak",
                        value: "Tidak",
                      },
                    ]}
                    variant="primary"
                    labelSize="sm"
                    control={control}
                    buttonValue={isSuratTugas}
                    onChange={(e) => setIsSuratTugas(e.target.value)}
                  />
                </div>
              </div>
            </section>
          </Fragment>
        )}

        <div className="flex w-full justify-center lg:justify-end py-4 mt-12 relative md:left-20">
          <Button
            type="submit"
            variant="filled"
            size="md"
            height="h-6"
            disabled={
              isDisabled ||
              !!surat_anggota_nu ||
              !!sertifikat_aktif ||
              !!sertifikat_kejuaraan ||
              !!surat_dokter
            }
          >
            Submit
          </Button>
        </div>
      </form>
    </Accordion>
  );
};
