"use client";
import { BreadCrumb, Button, RadioButton } from "@uninus/web/components";
import { FC, Fragment, ReactElement, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { useStudentData } from "@uninus/web/services";
import { useBiodataUpdate } from "../biodata";
import { beasiswa } from "./store";
import { RedirectType, redirect } from "next/navigation";

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
  const [scholarshipId, setScholarshipId] = useState<number | null | undefined>(undefined);

  const { getStudent } = useStudentData();

  const scholarship = useMemo(() => {
    return getStudent?.scholarship_id;
  }, [getStudent?.scholarship_id]);

  const selectionType = useMemo(() => {
    return getStudent?.selection_path_id;
  }, [getStudent?.selection_path_id]);

  const documents = useMemo(() => {
    return getStudent?.documents;
  }, [getStudent?.documents]);

  useEffect(() => {
    if (selectionType === 3) {
      redirect("/dashboard", RedirectType.replace);
    } else if (!documents?.find((doc) => doc.name === "Kartu Keluarga")) {
      redirect("/dashboard", RedirectType.replace);
    }
  }, [selectionType, documents]);

  useEffect(() => {
    if (scholarshipId) {
      redirect("/dashboard/registrasi/beasiswa/upload-berkas", RedirectType.replace);
    }
  }, [scholarshipId]);

  const { control, handleSubmit, reset, setValue } = useForm<FieldValues>({
    mode: "all",
  });

  const { mutate } = useBiodataUpdate();

  const student = useMemo(() => {
    return getStudent;
  }, [getStudent]);

  const onSubmit = handleSubmit((data) => {
    beasiswa.scholarship_id = Number(data?.beasiswa);
    try {
      setIsLoading(true);
      mutate(beasiswa, {
        onSuccess: () => {
          setIsLoading(false);
          setScholarshipId(beasiswa.scholarship_id);
          redirect("/dashboard/registrasi/beasiswa/upload-berkas");
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

  useEffect(() => {
    reset(student);
  }, [student, reset]);

  useEffect(() => {
    setScholarshipId(student?.scholarship_id);
  }, [student?.scholarship_id]);

  return (
    <Fragment>
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
        <form onSubmit={onSubmit} className="flex flex-col w-full gap-3">
          <div className="flex bg-primary-white p-5 shadow-lg rounded-md w-full h-auto justify-between">
            <div className="flex items-center gap-3 w-[80%]">
              <h1 className="text-[13px] md:text-[1rem] xl:text-[1.3rem] text-primary-green font-extrabold text-left">
                Beasiswa Nusantara Unggul
              </h1>
              <h2 className="text-[11px] md:text-[0.9rem] xl:text-[1rem] text-secondary-green-4 font-bold text-left">
                (50% Potongan UKT Semester 1)
              </h2>
            </div>
            <div className="w-[20%] xl:w-[25%] flex justify-end items-center pb-2">
              <RadioButton
                id="beasiswa_nusantara_unggul"
                name="beasiswa"
                value="1"
                control={control}
                size="md"
                variant="primary"
                defaultChecked={scholarship === 1}
                onChange={(e) => {
                  setValue("beasiswa", Number(e.target.value));
                }}
              />
            </div>
          </div>
          <div className="flex bg-primary-white p-5 shadow-lg rounded-md w-full h-auto justify-between">
            <div className="flex flex-col items-center gap-3 w-[80%]">
              <div className="w-full flex items-center gap-2">
                <h1 className="text-[13px] md:text-[1rem] xl:text-[1.3rem] text-primary-green font-extrabold text-left">
                  Beasiswa Nusantara Berprestasi
                </h1>
                <h2 className="text-[11px] md:text-[0.9rem] xl:text-[1rem] text-secondary-green-4 font-extrabold text-left">
                  (25% Potongan UKT Semester 1)
                </h2>
              </div>
              <div className="w-full flex flex-col justify-center gap-1 xl:gap-3">
                <p className="text-grayscale-6 text-[11px] md:text-[0.9rem] xl:text-[1rem] text-left">
                  Persyaratan Dokumen :{" "}
                </p>
                <ol className="text-grayscale-6 list-decimal pl-5 text-[11px] md:text-[0.9rem] xl:text-[1rem] text-left">
                  <li>Bukti kejuaraan minimal juara 3 tingkat kabupaten/daerah, atau</li>
                  <li>Bukti tahfiz qur &apos; an minimal 3 juz</li>
                </ol>
              </div>
            </div>
            <div className="w-[20%] xl:w-[25%] flex justify-end items-center pb-2">
              <RadioButton
                id="beasiswa_nusantara_berprestasi"
                name="beasiswa"
                value="2"
                control={control}
                size="md"
                variant="primary"
                defaultChecked={scholarship === 2}
                onChange={(e) => {
                  setValue("beasiswa", Number(e.target.value));
                }}
              />
            </div>
          </div>
          <div className="flex bg-primary-white p-5 shadow-lg rounded-md w-full h-auto justify-between">
            <div className="flex flex-col items-center gap-3 w-[80%]">
              <div className="w-full flex items-center gap-2">
                <h1 className="text-[13px] md:text-[1rem] xl:text-[1.3rem] text-primary-green font-extrabold text-left">
                  Beasiswa Mitra Nusantara
                </h1>
                <h2 className="text-[11px] md:text-[0.9rem] xl:text-[1rem] text-secondary-green-4 font-extrabold text-left">
                  (20% Potongan UKT Semester 1)
                </h2>
              </div>
              <div className="w-full flex flex-col justify-center gap-1 xl:gap-3">
                <p className="text-grayscale-6 text-[11px] text-left md:text-[0.9rem] xl:text-[1rem]">
                  Persyaratan Dokumen :{" "}
                </p>
                <ol className="text-grayscale-6 list-decimal pl-5 text-[11px] md:text-[0.9rem] xl:text-[1rem] text-left">
                  <li>Bukti keanggotaan NU(Orang tua), atau</li>
                  <li>Surat tugas mengajar bagi guru SMA/SMK/MA atau Sederajat (Orang Tua)</li>
                </ol>
              </div>
            </div>
            <div className="w-[20%] xl:w-[25%] flex justify-end items-center pb-2">
              <RadioButton
                id="beasiswa_mitra_nusantara"
                name="beasiswa"
                value="3"
                control={control}
                size="md"
                variant="primary"
                defaultChecked={scholarship === 3}
                onChange={(e) => {
                  setValue("beasiswa", Number(e.target.value));
                }}
              />
            </div>
          </div>
          <div className="flex bg-primary-white p-5 shadow-lg rounded-md w-full h-auto justify-between">
            <div className="flex flex-col items-center gap-3 w-[80%]">
              <div className="w-full flex items-center gap-2">
                <h1 className="text-[13px] md:text-[1rem] xl:text-[1.3rem] text-primary-green font-extrabold text-left">
                  Beasiswa Nusantara Peduli Difabel
                </h1>
                <h2 className="text-[11px] md:text-[0.9rem] xl:text-[1rem] text-secondary-green-4 font-extrabold text-left">
                  (20% Potongan UKT Semester 1)
                </h2>
              </div>
              <div className="w-full flex flex-col justify-center gap-1 xl:gap-3">
                <p className="text-grayscale-6 text-[11px] md:text-[0.9rem] xl:text-[1rem] text-left">
                  Persyaratan Dokumen :{" "}
                </p>
                <ol className="text-grayscale-6 list-decimal pl-5 text-[11px] md:text-[0.9rem] xl:text-[1rem] text-left">
                  <li>Surat Keterangan difabel dari dokter/rumah sakit</li>
                </ol>
              </div>
            </div>
            <div className="w-[20%] xl:w-[25%] flex justify-end items-center pb-2">
              <RadioButton
                id="beasiswa_nusantara_peduli_difabel"
                name="beasiswa"
                value="4"
                control={control}
                size="md"
                variant="primary"
                defaultChecked={scholarship === 4}
                onChange={(e) => {
                  setValue("beasiswa", Number(e.target.value));
                }}
              />
            </div>
          </div>

          <div className="flex w-full justify-between py-8 items-center">
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
              type="submit"
              variant="filled"
              size="md"
              width="w-auto md:w-[14em]"
              loading={isLoading}
            >
              <p className="px-2 md:flex hidden">Upload berkas</p>
              <CaretRightOutlined />
            </Button>
          </div>
        </form>
      </section>
    </Fragment>
  );
};
