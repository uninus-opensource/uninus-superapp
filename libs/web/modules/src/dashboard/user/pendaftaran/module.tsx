"use client";
import { ReactElement, FC } from "react";
import { Button, SelectOption } from "@uninus/web/components";
import { pendaftaran } from "./store";
import { FieldValues, useForm } from "react-hook-form";

export const ModulePendaftaran: FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FieldValues>({
    defaultValues: {
      program: undefined,
      seleksi: undefined,
      prodi1: undefined,
      prodi2: undefined,
      pembayaran: undefined,
      draggableComponent: undefined,
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <section
      key="dashboard-pendaftaran"
      className="flex flex-col text-center lg:px-10 px-4 gap-y-6  lg:text-start"
    >
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5">
          PMB <span className="text-secondary-green-4"> / Pendaftaran</span>
        </h1>
        <p className=" text-lg 2xl:text-2xl  font-bold text-secondary-green-4">Pendaftaran</p>
      </div>
      <div className="flex flex-col gap-4 w-full bg-primary-white p-12 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <h1 className="text-2xl font-bold">Formulir Pendaftaran</h1>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-y-4">
            <SelectOption
              placeholder="Pilih Program Pendidikan"
              labels="Program Pendidikan"
              labelClassName="md:text-base"
              control={control}
              name="program"
              options={pendaftaran.programPendidikan}
              isSearchable={true}
              isMulti={false}
              isClearable={true}
              required={true}
            />
            <SelectOption
              placeholder="Pilih Program Studi"
              labelClassName="md:text-base"
              labels="Pilihan Program Studi 1"
              control={control}
              name="prodi1"
              options={pendaftaran.programStudy}
              isSearchable={true}
              isMulti={false}
              isClearable={true}
              required={true}
            />
            <SelectOption
              placeholder="Pilih Program Studi"
              labels="Pilihan Program Studi 2"
              labelClassName="md:text-base"
              control={control}
              name="prodi2"
              options={pendaftaran.programStudy}
              isSearchable={true}
              isMulti={false}
              isClearable={true}
              required={true}
            />
            <SelectOption
              placeholder="Pilih Jalur Seleksi"
              labels="Jalur Seleksi"
              labelClassName="md:text-base"
              control={control}
              name="seleksi"
              options={pendaftaran.jalurSeleksi}
              isSearchable={true}
              isMulti={false}
              isClearable={true}
              required={true}
            />
          </div>
          <div className="flex flex-col gap-8 w-full items-center mt-4 lg:items-start">
            <Button
              variant="elevated"
              size="sm"
              width="w-48"
              height="h-12"
              disabled={!isValid}
              className={`${
                isValid ? "bg-primary-green" : "bg-slate-2 cursor-not-allowed"
              } text-white rounded-md`}
            >
              Daftar Sekarang
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
