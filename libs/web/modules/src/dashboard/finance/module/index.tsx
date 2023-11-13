"use client";
import { ReactElement, FC } from "react";
import { ChartRekap } from "./chart-line";
import { CardSection } from "./card-section";
import { PaymentSummaryTable } from "./Table";

export const DashboardModuleAdminKeuangan: FC = (): ReactElement => {
  return (
    <section className="flex flex-col text-center gap-y-6 lg:text-start">
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5 ">
          Beranda<span className="text-secondary-green-4"> / Bendahara Penerimaan </span>
        </h1>
        <p className="text-lg 2xl:text-2xl font-bold text-secondary-green-4">Beranda</p>
      </div>
      <h1 className="text-lg lg:text-2xl font-bold text-secondary-green-4">Rekapitulasi Data</h1>
      <CardSection />
      <ChartRekap />
      <section className="flex lg:flex-row md:flex-col flex-col gap-x-8">
        <PaymentSummaryTable />
      </section>
    </section>
  );
};
