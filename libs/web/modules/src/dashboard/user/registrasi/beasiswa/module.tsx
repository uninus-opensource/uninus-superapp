"use client";
import { BreadCrumb, SelectOption, Button } from "@uninus/web/components";
import { FC, ReactElement, useMemo, useState } from "react";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import { useScholarshipGet } from "./hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import Link from "next/link";

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
    formState: { isValid },
  } = useForm<FieldValues>({
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

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const handleButtonClick = () => {
    if (isButtonDisabled) {
      return;
    }
    setIsButtonDisabled(true);
    toast.success("Beasiswa Berhasil Disimpan!");
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
        <div className="flex flex-col gap-2 h-full justify-center items-center">
          <h1 className="text-primary-green font-extrabold text-3xl">Selamat Mawar Saidah</h1>
          <p className="pl-14 ">Anda berhak mendapatkan beasiswa di bawah ini</p>
        </div>
      </div>
      <div className="flex flex-col p-8 bg-primary-white shadow-lg rounded-md w-full lg:h-[240px] h-auto">
        <SelectOption
          labels="Pilih salah satu beasiswa yang tersedia"
          labelClassName="text-xl py-2"
          className="shadow-md bg-slate-4 rounded-md text-primary-black w-full"
          placeholder="Pilih Beasiswa"
          options={scholarshipOptions || []}
          isClearable={false}
          isSearchable={false}
          name="beasiwa"
          control={control}
          required={true}
          isMulti={false}
        />
        <div className="flex w-full justify-center lg:justify-end py-8">
          <Button
            onClick={handleButtonClick}
            type="button"
            variant="filled"
            size="md"
            width="w-50% lg:w-25% xl:w-15%"
            disabled={isButtonDisabled || !isValid}
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
