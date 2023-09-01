"use client";
import { ReactElement, FC } from "react";
import { ChartRekap } from "./chart-line";
import { RekapProgram } from "./chart-doughnut";
import { CardSection } from "./card-section";
import { ChartProgram } from "./chart-bar";

export const DashboardModuleAdmin: FC = (): ReactElement => {
  return (
    <section className="flex flex-col text-center gap-y-6 lg:text-start">
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5 ">
          Admin PMB <span className="text-secondary-green-4"> / Beranda</span>
        </h1>
        <p className="text-lg 2xl:text-2xl font-bold text-secondary-green-4">Beranda</p>
      </div>
      <h1 className="text-lg lg:text-2xl font-bold text-secondary-green-4">Rekapitulasi Data</h1>
      <CardSection />
      <section className="flex lg:flex-row md:flex-col flex-col gap-x-8">
        <ChartRekap />
        <RekapProgram />
      </section>
      <ChartProgram />
    </section>
  );
};
