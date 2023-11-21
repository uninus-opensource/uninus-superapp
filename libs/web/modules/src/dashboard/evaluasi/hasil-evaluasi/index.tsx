"use client";
import { ReactElement, FC } from "react";
import TableHasil from "./table-hasil";

export const ModuleHasilEvaluasi: FC = (): ReactElement => {
  return (
    <section className="flex flex-col text-center gap-y-6 lg:text-start">
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5 ">
          Hasil Evaluasi<span className="text-secondary-green-4"> / EDOM </span>
        </h1>
        <p className="text-lg 2xl:text-2xl font-bold text-secondary-green-4"> Hasil Evaluasi</p>
      </div>
      <div>
        <TableHasil />
      </div>
    </section>
  );
};
