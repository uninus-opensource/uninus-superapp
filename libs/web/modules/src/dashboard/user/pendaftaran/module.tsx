"use client";
import { ReactElement, FC, useEffect, useMemo, useState, useRef } from "react";
import { Button, SelectOption } from "@uninus/web/components";
import { FieldValues, useForm } from "react-hook-form";
import { useDegreeProgramGet, useDepartmentGet, useSelectionGet, useStudentUpdate } from "./hooks";
import { studentData } from "./type";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useGetBiodata } from "../registrasi";
import { GroupBase, SelectInstance } from "react-select";
import { TSelectOption } from "@uninus/web/components";

export type CustomSelectInstance = {
  select: {
    clearValue: () => void;
  };
};

export const ModulePendaftaran: FC = (): ReactElement => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      program: undefined,
      prodi1: undefined,
      prodi2: undefined,
      seleksi: undefined,
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

  const { data } = useGetBiodata();

  const student = useMemo(() => {
    return data;
  }, [data]);

  const prodi1Ref = useRef<SelectInstance<TSelectOption, true, GroupBase<TSelectOption>>>(null);
  const prodi2Ref = useRef<SelectInstance<TSelectOption, true, GroupBase<TSelectOption>>>(null);

  useEffect(() => {
    if (prodi1Ref.current) {
      prodi1Ref.current.clearValue();
    }
    if (prodi2Ref.current) {
      prodi2Ref.current.clearValue();
    }
  }, [watch("program")]);

  useEffect(() => {
    setValue("department", null);
  }, [watch("program")]);

  useEffect(() => {
    reset(student);
  }, [student, reset]);

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

  const { mutate } = useStudentUpdate();

  const selectionDegreeProgram = getDegreeProgram?.degree_program.find(
    (degree) => degree.id === data?.degree_program_id,
  );
  const selectionFirstDepartement = getDepartment?.department.find(
    (degree) => degree.id === data?.first_deparment_id,
  );
  const selectionSecondDepartement = getDepartment?.department.find(
    (degree) => degree.id === data?.second_deparment_id,
  );
  const selectionType = getSelection?.selection.find(
    (degree) => degree.id === data?.selection_path_id,
  );

  const onSubmit = handleSubmit((data) => {
    studentData.degree_program_id = Number(data.program);
    studentData.first_deparment_id = Number(data.prodi1);
    studentData.second_deparment_id = Number(data.prodi2);
    studentData.selection_path_id = Number(data.seleksi);

    try {
      mutate(studentData, {
        onSuccess: () => {
          setIsFormSubmitted(true);
          setTimeout(() => {
            toast.success("Berhasil mengisi formulir", {
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
            toast.error("Gagal mengisi formulir", {
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

  return (
    <section
      key="dashboard-pendaftaran"
      className="flex flex-col text-center px-4 gap-y-6 lg:text-start"
    >
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5">
          PMB <span className="text-secondary-green-4"> / Pendaftaran</span>
        </h1>
        <p className="text-lg 2xl:text-2xl pt-2 font-extrabold text-secondary-green-4">
          Pendaftaran
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full bg-primary-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Formulir Pendaftaran</h1>
          <p className="text-conditional-error font-bold">
            Perhatian :{" "}
            <span className="text-primary-black font-normal">
              Data telah disubmit tidak dapat di edit
            </span>
          </p>
        </div>

        <form onSubmit={onSubmit}>
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
          <div className="flex flex-col gap-y-4">
            <SelectOption
              placeholder={selectionDegreeProgram?.name || "Pilih Program Pendidikan"}
              labels="Program Pendidikan"
              className="text-left"
              labelClassName="text-left py-2"
              control={control}
              name="program"
              options={DegreeProgramOptions || []}
              isSearchable={true}
              isMulti={false}
              isClearable={true}
              required={true}
              disabled={!!selectionDegreeProgram || isFormSubmitted}
            />
            <SelectOption
              ref={prodi1Ref}
              placeholder={selectionFirstDepartement?.name || "Pilih Program Studi"}
              className="text-left"
              labelClassName="text-left py-2"
              labels="Pilihan Program Studi 1"
              control={control}
              name="prodi1"
              options={DepartmentOptions || []}
              isSearchable={true}
              isMulti={false}
              isClearable={true}
              required={true}
              disabled={!watch("program") || isFormSubmitted}
            />
            <SelectOption
              placeholder={selectionSecondDepartement?.name || "Pilih Program Studi"}
              labels="Pilihan Program Studi 2"
              className="text-left"
              labelClassName="text-left py-2"
              control={control}
              name="prodi2"
              options={DepartmentOptions || []}
              isSearchable={true}
              isMulti={false}
              isClearable={true}
              required={true}
              disabled={!watch("program") || isFormSubmitted}
              ref={prodi2Ref}
            />
            <SelectOption
              placeholder={selectionType?.name || "Pilih Jalur Seleksi"}
              labels="Jalur Seleksi"
              className="text-left"
              labelClassName="text-left py-2"
              control={control}
              name="seleksi"
              options={SelectionOptions || []}
              isSearchable={true}
              isMulti={false}
              isClearable={true}
              required={true}
              disabled={!!selectionType || isFormSubmitted}
            />
          </div>
          <div className="flex flex-col gap-8 w-full items-center mt-4 lg:items-end">
            <Button
              variant="elevated"
              size="sm"
              width="w-48"
              height="h-12"
              disabled={!isValid || isFormSubmitted}
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
