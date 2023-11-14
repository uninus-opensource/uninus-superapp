"use client";
import { ReactElement, FC } from "react";
import { CardSection } from "./card-data";
import { ChartSkor } from "./chart-score";
import { ChartPercent } from "./chart-percen";

export const DashboardModuleEdom: FC = (): ReactElement => {
  return (
    <section className="flex flex-col text-center gap-y-6 lg:text-start">
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5 ">
          Beranda<span className="text-secondary-green-4"> / EDOM </span>
        </h1>
        <p className="text-lg 2xl:text-2xl font-bold text-secondary-green-4">Beranda</p>
      </div>
      <h1 className="text-lg lg:text-xl font-bold text-secondary-green-4">Rekapitulasi Data</h1>
      <CardSection />
      <section className="flex">
        <div className="w-[70%]">
          <ChartSkor />
        </div>
        <div className="w-[25%]">
          <ChartPercent />
        </div>
      </section>
    </section>
  );
};
