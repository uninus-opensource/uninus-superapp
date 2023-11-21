"use client";
import { ReactElement, FC } from "react";
import TableKuesioner from "./table-kuesioner";

export const ModulePertanyaanEdom: FC = (): ReactElement => {
  return (
    <section className="flex flex-col text-center gap-y-6 lg:text-start">
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5 ">
          Kelola Pertanyaan<span className="text-secondary-green-4"> / EDOM </span>
        </h1>
        <p className="text-lg 2xl:text-2xl font-bold text-secondary-green-4"> Kelola Pertanyaan</p>
      </div>
      <div>
        <TableKuesioner />
      </div>
    </section>
  );
};
