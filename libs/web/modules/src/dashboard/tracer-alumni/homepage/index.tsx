"use client";
import { ReactElement, FC } from "react";
import { CardSection } from "./card";
import { BarChart } from "./bar-chart";
import { DoughnutChart } from "./doughnut-chart";
import { HorizontalBar } from "./horizontal-bar";

export const DashboardModuleTracerALumni: FC = (): ReactElement => {
  return (
    <section className="flex flex-col text-center gap-y-6 lg:text-start">
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5 ">
          Tracer Alumni <span className="text-secondary-green-4"> / Beranda</span>
        </h1>
        <p className="text-lg 2xl:text-2xl font-bold text-secondary-green-4">Beranda</p>
      </div>
      <h1 className="text-lg lg:text-2xl font-bold text-secondary-green-4">Rekapitulasi Data</h1>
      <CardSection />
      <div className="flex md:flex-row flex-col gap-x-8">
        <BarChart />
        <DoughnutChart />
      </div>
      <HorizontalBar />
    </section>
  );
};
