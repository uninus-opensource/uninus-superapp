"use client";
import { ReactElement, FC } from "react";

export const DashboardModuleAdmin: FC = (): ReactElement => {
  return (
    <section className="flex flex-col  lg:px-10 px-4 text-center gap-y-6 lg:text-start">
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5 ">
          Admin PMB <span className="text-secondary-green-4"> / Beranda</span>
        </h1>
        <p className="text-lg 2xl:text-2xl font-bold text-secondary-green-4">Beranda</p>
      </div>
      <span>Test</span>
    </section>
  );
};
