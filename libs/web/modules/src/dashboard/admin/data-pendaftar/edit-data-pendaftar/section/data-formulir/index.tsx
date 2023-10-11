"use client";
import { ReactElement, FC, useEffect, useMemo, useState, useRef } from "react";
import { Button, SelectOption } from "@uninus/web/components";
import { FieldValues, useForm } from "react-hook-form";
import {
  useDegreeProgramGet,
  useDepartmentGet,
  useSelectionGet,
} from "../../../../../user/pendaftaran/hooks";
import { studentPendaftaran } from "./store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { GroupBase, SelectInstance } from "react-select";
import { TSelectOption } from "@uninus/web/components";
import { useDashboardStateControl, useStudentDataById } from "@uninus/web/services";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { TVSPendaftaran, VSPendaftaran } from "./schema";
import { useBiodataUpdateById } from "../../hooks";

export type CustomSelectInstance = {
  select: {
    clearValue: () => void;
  };
};

export const EditFormulirPendaftar: FC = (): ReactElement => {
  const [isS3Selected, setIs3Selected] = useState(false);

  const { getStudentbyId } = useStudentDataById();

  const student = useMemo(() => {
    return getStudentbyId;
  }, [getStudentbyId]);

  const path = usePathname();
  const id = path.slice(46);

  const { setDashboardControlState } = useDashboardStateControl();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FieldValues | TVSPendaftaran>({
    mode: "all",
    resolver: zodResolver(VSPendaftaran),
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

  const { mutate } = useBiodataUpdateById(id);

  const selectionDegreeProgram = getDegreeProgram?.degree_program.find(
    (degree) => degree.id === student?.degree_program_id,
  );
  const selectionFirstDepartement = getDepartment?.department.find(
    (degree) => degree.id === student?.first_department_id,
  );
  const selectionSecondDepartement = getDepartment?.department.find(
    (degree) => degree.id === student?.second_department_id,
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
    studentPendaftaran.first_department_id = Number(data.first_department_id);
    studentPendaftaran.second_department_id = Number(data.second_department_id);
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
      className="flex flex-col text-center p-5 gap-y-6 lg:text-start bg-primary-white"
    >
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
            required
            control={control}
            name="degree_program_id"
            options={DegreeProgramOptions || []}
            isSearchable={true}
            isMulti={false}
            isClearable={true}
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
            name="first_department_id"
            options={DepartmentOptions || []}
            isSearchable={true}
            isMulti={false}
            isClearable={true}
            required={true}
            disabled={!watch("degree_program_id")}
            status="error"
            message={
              watch("degree_program_id") && !student?.first_department_id
                ? (errors?.first_department_id?.message as string)
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
              name="second_department_id"
              options={DepartmentOptions || []}
              isSearchable={true}
              isMulti={false}
              isClearable={true}
              required={true}
              disabled={!watch("degree_program_id")}
              ref={prodi2Ref}
              status="error"
              message={
                watch("degree_program_id") && !isS3Selected && !student?.second_department_id
                  ? (errors?.second_department_id?.message as string)
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
            disabled={!watch("degree_program_id")}
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
            disabled={watch("first_deparment_id") === watch("second_deparment_id")}
          >
            Daftar Sekarang
          </Button>
        </div>
      </form>
    </section>
  );
};
