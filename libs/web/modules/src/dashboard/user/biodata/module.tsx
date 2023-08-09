"use client";
import { ReactElement, FC, Fragment } from "react";
import { DataDiriSection } from "./section/data-diri";
import { DataPendidikanSection } from "./section/data-pendidikan";
import { DataOrtuSection } from "./section/data-ortu";
import { DataNilaiSection } from "./section/data-nilai";
import { BerkasKhususSection } from "./section/berkas-khusus";

export const ModuleBiodata: FC = (): ReactElement => {
  return (
    <Fragment key="dashboard-biodata">
      <div className="flex flex-col items-center lg:items-start p-5 lg:p-0 lg:py-4">
        <h1 className="text-slate-5">
          PMB <span className="text-secondary-green-4"> / Data diri</span>
        </h1>
        <p className="text-lg font-bold text-secondary-green-4">Pengisian data diri</p>
      </div>

      <section className="flex flex-col rounded-lg gap-6 w-full bg-slate-1 ">
        <section className="flex flex-col gap-8 py-10 w-full justify-center items-center rounded-lg bg-primary-white overflow-x-hidden">
          {/* Accordion section */}
          <DataDiriSection />
          <DataPendidikanSection />
          <DataNilaiSection />
          <DataOrtuSection />
          <BerkasKhususSection />
        </section>
      </section>
    </Fragment>
  );
};
