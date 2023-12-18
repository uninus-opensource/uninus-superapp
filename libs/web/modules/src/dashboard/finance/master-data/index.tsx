"use client";
import { ReactElement, FC } from "react";

import { DataProdiTable } from "./Table";

export const MasterDataAdminKeuangan: FC = (): ReactElement => {
  return (
    <section className="flex flex-col text-center gap-y-6 lg:text-start">
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5 ">
          Bendahara Penerimaan <span className="text-secondary-green-4"> / </span>Master Data
          <span className="text-secondary-green-4"> / Data Prodi </span>
        </h1>
        <p className="text-lg 2xl:text-2xl font-bold text-secondary-green-4">Data Prodi</p>
      </div>
      <h1 className="text-lg lg:text-2xl font-bold text-secondary-green-4">Table Data Prodi</h1>

      <section className="flex lg:flex-row md:flex-col flex-col gap-x-8">
        <DataProdiTable />
      </section>
    </section>
  );
};
