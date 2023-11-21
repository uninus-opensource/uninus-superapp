"use client";
import { ReactElement, FC, useState, useEffect } from "react";
import { DataDiriSection } from "./section/data-diri";
import { CaretRightOutlined } from "@ant-design/icons";
import { DataPendidikanSection } from "./section/data-pendidikan";
import { DataOrtuSection } from "./section/data-ortu";
import { DataNilaiSection } from "./section/data-nilai";
import { Button } from "@uninus/web/components";
import { useDashboardStateControl, useStudentData } from "@uninus/web/services";

export const ModuleBiodata: FC = (): ReactElement => {
  const [degreeProgram, setDegreeProgram] = useState<number | null | undefined>(null);
  const [route, setRoute] = useState<boolean>(true);
  const { getDashboardControlState, setDashboardControlState } = useDashboardStateControl();
  const { getStudent } = useStudentData();

  const average = getStudent?.average_grade;
  const selectionType = getStudent?.selection_path_id;

  useEffect(() => {
    if (
      (getStudent?.nik && getStudent?.education_type_id && getStudent?.father_name) ||
      (getStudent?.nik &&
        getStudent?.education_type_id &&
        getStudent?.average_utbk &&
        getStudent?.father_name)
    ) {
      setRoute(false);
    }
    setDegreeProgram(getStudent?.degree_program_id);
  }, [getStudent]);

  return (
    <section
      key="dashboard-biodata"
      className="flex flex-col text-center px-4 gap-y-6  lg:text-start"
    >
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5">
          PMB <span className="text-secondary-green-4"> / Registrasi</span>
        </h1>
        <p className=" text-lg 2xl:text-2xl font-extrabold pt-2 text-secondary-green-4">
          Pengisian Data Registrasi
        </p>
        <p className="text-conditional-error font-bold text-base mt-4">
          Perhatian :{" "}
          <span className="text-primary-black font-normal">
            Data yang telah disubmit tidak dapat di edit
          </span>
        </p>
      </div>

      <section className="flex flex-col gap-4 w-full bg-primary-white p-4 rounded-lg shadow-lg">
        <section className="flex flex-col gap-8 w-full justify-center items-center py-2 rounded-lg bg-primary-white overflow-x-hidden">
          {degreeProgram === 1 && getStudent?.registration_path_id !== 2 ? (
            <section key="s1" className="w-full flex flex-col gap-y-2">
              <DataDiriSection />
              <DataPendidikanSection />
              <DataNilaiSection />
              <DataOrtuSection />
            </section>
          ) : (
            <section key="s2" className="w-full flex flex-col gap-y-2">
              <DataDiriSection />
              <DataPendidikanSection />
              <DataOrtuSection />
            </section>
          )}
        </section>

        <div className="flex gap-6 justify-end px-8 py-4">
          <Button
            variant="filled"
            href={`${
              average! >= 85 && selectionType !== 3
                ? "/dashboard/registrasi/beasiswa"
                : "/dashboard/dokumen"
            }`}
            onClick={() => {
              setDashboardControlState(!getDashboardControlState);
            }}
            size="md"
            width="w-auto"
            styling="text-xs md:text-sm lg:text-base"
            disabled={route}
          >
            <span className="px-2 flex">{`${
              average! >= 85 && selectionType !== 3 ? "Beasiswa" : "Upload Dokumen"
            }`}</span>
            <CaretRightOutlined />
          </Button>
        </div>
      </section>
    </section>
  );
};
