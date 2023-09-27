"use client";
import { ReactElement, FC } from "react";
import Table from "./table";

export const ModuleDataDosen: FC = (): ReactElement => {
  return (
    <section className="flex flex-col text-center gap-y-6 lg:text-start">
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5 ">
          Manajemen Pegawai <span className="text-secondary-green-4"> / Data Dosen</span>
        </h1>
        <p className="text-lg 2xl:text-2xl font-bold text-secondary-green-4">Data Dosen</p>
      </div>
      <Table />
    </section>
  );
};