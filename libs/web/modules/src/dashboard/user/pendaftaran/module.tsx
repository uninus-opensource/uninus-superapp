"use client";
import { ReactElement, FC, useEffect, useMemo, useState, useRef } from "react";
import { Button, SelectOption } from "@uninus/web/components";
import { FieldValues, useForm } from "react-hook-form";
import { useDegreeProgramGet, useDepartmentGet, useSelectionGet, useStudentUpdate } from "./hooks";
import { studentPendaftaran } from "./store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { GroupBase, SelectInstance } from "react-select";
import { TSelectOption } from "@uninus/web/components";
import { useDashboardStateControl, useStudentData } from "@uninus/web/services";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { TVSPendaftaran, VSPendaftaran } from "./schema";

export type CustomSelectInstance = {
  select: {
    clearValue: () => void;
  };
};

export const ModulePendaftaran: FC = (): ReactElement => {
  const [isS3Selected, setIs3Selected] = useState(false);

  const { setDashboardControlState } = useDashboardStateControl();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid, errors },
    reset,
  } = useForm<FieldValues | TVSPendaftaran>({
    mode: "all",
    resolver: zodResolver(VSPendaftaran),
    defaultValues: {},
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
    degree_program_id: watch("degree_program_id"),
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

  const { getStudent } = useStudentData();

  const student = useMemo(() => {
    return getStudent;
  }, [getStudent]);

  const prodi1Ref = useRef<SelectInstance<TSelectOption, true, GroupBase<TSelectOption>>>(null);
  const prodi2Ref = useRef<SelectInstance<TSelectOption, true, GroupBase<TSelectOption>>>(null);

  useEffect(() => {
    if (prodi1Ref.current) {
      prodi1Ref.current.clearValue();
    }
    if (prodi2Ref.current) {
      prodi2Ref.current.clearValue();
    }
  }, [watch("degree_program_id")]);

  useEffect(() => {
    setValue("department", null);
  }, [watch("degree_program_id")]);

  useEffect(() => {
    const program = watch("degree_program_id");
    setIs3Selected(program);

    if (program === "3") {
      setIs3Selected(true);
    } else {
      setIs3Selected(false);
    }
  }, [watch("degree_program_id")]);

  const { data: getSelection } = useSelectionGet({
    search: "",
    degree_program_id: watch("degree_program_id"),
  });

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
    (degree) => degree.id === student?.degree_program_id,
  );
  const selectionFirstDepartement = getDepartment?.department.find(
    (degree) => degree.id === student?.first_deparment_id,
  );
  const selectionSecondDepartement = getDepartment?.department.find(
    (degree) => degree.id === student?.second_deparment_id,
  );
  const selectionType = getSelection?.selection.find(
    (degree) => degree.id === student?.selection_path_id,
  );

  useEffect(() => {
    reset(student);
  }, [student, reset]);

  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    studentPendaftaran.degree_program_id = Number(data.degree_program_id);
    studentPendaftaran.first_deparment_id = Number(data.first_deparment_id);
    studentPendaftaran.second_deparment_id = Number(data.second_deparment_id);
    studentPendaftaran.selection_path_id = Number(data.selection_path_id);

    try {
      mutate(studentPendaftaran, {
        onSuccess: () => {
          setDashboardControlState(true);
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
          router.push("/dashboard/registrasi/biodata");
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
              Data yang telah disubmit tidak dapat di edit
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
              name="degree_program_id"
              options={DegreeProgramOptions || []}
              isSearchable={true}
              isMulti={false}
              isClearable={true}
              disabled={!!student?.degree_program_id || undefined}
              status="error"
              message={errors?.degree_program_id?.message as string}
            />
            <SelectOption
              ref={prodi1Ref}
              placeholder={selectionFirstDepartement?.name || "Pilih Program Studi"}
              className="text-left"
              labelClassName="text-left py-2"
              labels={isS3Selected ? "Pilih Program Studi" : "Pilihan Program Studi 1"}
              control={control}
              name="first_deparment_id"
              options={DepartmentOptions || []}
              isSearchable={true}
              isMulti={false}
              isClearable={true}
              required={true}
              // disabled={
              //   !watch("degree_program_id") || isFormSubmitted || !!student?.first_deparment_id
              // }
              disabled={!watch("degree_program_id") || !!student?.first_deparment_id}
              status="error"
              message={
                watch("degree_program_id") && !student?.first_deparment_id
                  ? (errors?.first_deparment_id?.message as string)
                  : ""
              }
            />
            {!isS3Selected && (
              <SelectOption
                placeholder={selectionSecondDepartement?.name || "Pilih Program Studi"}
                labels="Pilihan Program Studi 2"
                className="text-left"
                labelClassName="text-left py-2"
                control={control}
                name="second_deparment_id"
                options={DepartmentOptions || []}
                isSearchable={true}
                isMulti={false}
                isClearable={true}
                required={true}
                // disabled={
                //   !watch("degree_program_id") || isFormSubmitted || !!student?.second_deparment_id
                // }
                disabled={!watch("degree_program_id") || !!student?.second_deparment_id}
                ref={prodi2Ref}
                status="error"
                message={
                  watch("degree_program_id") && !isS3Selected && !student?.second_deparment_id
                    ? (errors?.second_deparment_id?.message as string)
                    : ""
                }
              />
            )}

            <SelectOption
              placeholder={selectionType?.name || "Pilih Jalur Seleksi"}
              labels="Jalur Seleksi"
              className="text-left"
              labelClassName="text-left py-2"
              control={control}
              name="selection_path_id"
              options={SelectionOptions || []}
              isSearchable={true}
              isMulti={false}
              isClearable={true}
              required={true}
              // disabled={
              //   isFormSubmitted || !!student?.selection_path_id || !watch("degree_program_id")
              // }
              disabled={!watch("degree_program_id") || !!student?.selection_path_id}
              status="error"
              message={errors?.selection_path_id?.message as string}
            />
          </div>
          <div className="flex flex-col gap-2 w-full items-center mt-4 lg:mt-10 lg:items-end">
            {watch("second_deparment_id") &&
              !isS3Selected &&
              watch("first_deparment_id") === watch("second_deparment_id") && (
                <span className="text-xs text-red-4 font-bold">
                  Program studi pilihan 1 dan 2 tidak boleh sama
                </span>
              )}

            <Button
              variant="elevated"
              size="sm"
              width="w-48"
              height="h-12"
              disabled={
                !isValid ||
                watch("first_deparment_id") === watch("second_deparment_id") ||
                !!student?.degree_program_id ||
                !!student?.selection_path_id
              }
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
