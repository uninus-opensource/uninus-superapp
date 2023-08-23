"use client";
import { BreadCrumb, SelectOption, Button } from "@uninus/web/components";
import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import { useBiodataUpdate, useGetBiodata, useScholarshipGet } from "./hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { beasiswa } from "./type";

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

  const { data: getScholarship } = useScholarshipGet(scholarship);

  const scholarshipOptions = useMemo(
    () =>
      getScholarship?.scholarship?.map((scholarship) => ({
        label: scholarship?.name,
        value: scholarship?.id.toString(),
      })),
    [getScholarship?.scholarship],
  );
  console.log("scholarshipOptions:", scholarshipOptions);

  const [isDisabled, setIsdisabled] = useState<boolean>(false);

  const { mutate } = useBiodataUpdate();

  const { data } = useGetBiodata();

  const student = useMemo(() => {
    return data;
  }, [data]);

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
  }, [student, reset, data]);
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
        <div className="flex flex-col gap-2 h-full justify-center items-center">
          <h1 className="text-primary-green font-extrabold text-3xl">Selamat {data?.fullname}</h1>
          <p className="pl-14 ">Anda berhak mendapatkan beasiswa di bawah ini</p>
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
