"use client";
import { ReactElement, FC, useEffect, useMemo, useState } from "react";
import { Button, SelectOption } from "@uninus/web/components";
import { FieldValues, useForm } from "react-hook-form";
import { useDegreeProgramGet, useDepartmentGet, useSelectionGet } from "./hooks";

export const ModulePendaftaran: FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
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

  const [programMeta] = useState({
    search: "",
    degree_program_id: "",
    department_id: "",
  });

  const { data: getDegreeProgram } = useDegreeProgramGet(programMeta);

  const DegreeProgramOptions = useMemo(
    () =>
      getDegreeProgram?.degree_program?.map((program) => ({
        label: program?.name,
        value: program?.id.toString(),
      })),
    [getDegreeProgram?.degree_program],
  );

  const { data: getDepartment } = useDepartmentGet({
    degree_program_id: watch("program"),
    faculty_id: watch(""),
    search: "",
  });

  const DepartmentOptions = useMemo(
    () =>
      getDepartment?.department?.map((department) => ({
        label: department?.name,
        value: department?.id.toString(),
      })),
    [getDepartment?.department],
  );

  useEffect(() => {
    setValue("department", null);
  }, [watch("program")]);

  const [selection] = useState({
    search: "",
  });

  const { data: getSelection } = useSelectionGet(selection);

  const SelectionOptions = useMemo(
    () =>
      getSelection?.selection?.map((selection) => ({
        label: selection?.name,
        value: selection?.id.toString(),
      })),
    [getSelection?.selection],
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <section
      key="dashboard-pendaftaran"
      className="flex flex-col text-center  px-4 gap-y-6  lg:text-start"
    >
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5">
          PMB <span className="text-secondary-green-4"> / Pendaftaran</span>
        </h1>
        <p className=" text-lg 2xl:text-2xl pt-2 font-extrabold text-secondary-green-4">
          Pendaftaran
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full bg-primary-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">Formulir Pendaftaran</h1>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-y-4">
            <SelectOption
              placeholder="Pilih Program Pendidikan"
              labels="Program Pendidikan"
              labelClassName="md:text-base"
              control={control}
              name="program"
              options={DegreeProgramOptions || []}
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
              options={DepartmentOptions || []}
              isSearchable={true}
              isMulti={false}
              isClearable={true}
              required={true}
              disabled={!watch("program")}
            />
            <SelectOption
              placeholder="Pilih Program Studi"
              labels="Pilihan Program Studi 2"
              labelClassName="md:text-base"
              control={control}
              name="prodi2"
              options={DepartmentOptions || []}
              isSearchable={true}
              isMulti={false}
              isClearable={true}
              required={true}
              disabled={!watch("program")}
            />
            <SelectOption
              placeholder="Pilih Jalur Seleksi"
              labels="Jalur Seleksi"
              labelClassName="md:text-base"
              control={control}
              name="seleksi"
              options={SelectionOptions || []}
              isSearchable={true}
              isMulti={false}
              isClearable={true}
              required={true}
            />
          </div>
          <div className="flex flex-col gap-8 w-full items-center mt-4 lg:items-end">
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
