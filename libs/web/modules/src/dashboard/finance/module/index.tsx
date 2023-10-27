"use client";
import { ReactElement, FC, useEffect } from "react";
import { ChartRekap } from "./chart-line";

import { CardSection } from "./card-section";
import { PaymentSummaryTable } from "./Table";
import { useGetPaymentSummary } from "./hook";
import { useSetRecoilState } from "recoil";
import { paymentSummary } from "./store";

export const DashboardModuleAdminKeuangan: FC = (): ReactElement => {
  const { data } = useGetPaymentSummary();
  const setPaymentData = useSetRecoilState(paymentSummary);

  useEffect(() => {
    setPaymentData(data);
    console.log(data);
  }, [data]);

  return (
    <section className="flex flex-col text-center gap-y-6 lg:text-start">
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5 ">
          Bendahara Penerimaan <span className="text-secondary-green-4"> / Beranda</span>
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
