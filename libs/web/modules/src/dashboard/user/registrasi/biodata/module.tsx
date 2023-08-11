"use client";
import { ReactElement, FC, Fragment } from "react";
import { DataDiriSection } from "./section/data-diri";
import { DataPendidikanSection } from "./section/data-pendidikan";
import { DataOrtuSection } from "./section/data-ortu";
import { DataNilaiSection } from "./section/data-nilai";
import { BerkasKhususSection } from "./section/berkas-khusus";
import { BreadCrumb, Button } from "@uninus/web/components";
import Link from "next/link";

export const registrasiBreadcrumb = [
  {
    name: "Registrasi",
    link: "/dashboard/registrasi/biodata",
  },
];

export const ModuleBiodata: FC = (): ReactElement => {
  return (
    <Fragment key="dashboard-biodata">
      <div className="flex flex-col items-center lg:items-start p-5 lg:p-0 lg:py-4">
        <span className="flex gap-2">
          <h1 className="text-xs md:text-sm text-slate-5 font-bold">PMB/</h1>
          <BreadCrumb items={registrasiBreadcrumb} />
        </span>

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
        <div className="flex gap-6 justify-end px-8">
          <Link href="/dashboard/registrasi/pembayaran">
            <Button variant="filled" size="md" width="w-50% lg:w-25% xl:w-15%">
              Reguler
            </Button>
          </Link>
          <button>Beasiswa</button>
        </div>
      </section>
    </Fragment>
  );
};
