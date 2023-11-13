"use client";
import { ReactElement, FC } from "react";
import { CardSection } from "./cards";
import { BarChart } from "./bar-chart";
import { Grades } from "./grades";

export const ModuleHomepageSiakad: FC = (): ReactElement => {
  return (
    <section className="flex flex-col p-8 h-full  gap-y-6 lg:text-start max-w-90% ">
      <div className="2xl:text-2xl ">
        <h1 className="text-grayscale-9 text-2xl font-bold text-left">Dashboard</h1>
      </div>
      <CardSection />
      <div className="flex lg:flex-row flex-col gap-x-4 gap-y-4 py-4">
        <BarChart />
        <Grades />
      </div>
    </section>
  );
};
