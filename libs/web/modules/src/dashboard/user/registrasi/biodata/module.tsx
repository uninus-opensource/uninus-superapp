"use client";
import { ReactElement, FC } from "react";
import { DataDiriSection } from "./section/data-diri";
import { DataPendidikanSection } from "./section/data-pendidikan";
import { DataOrtuSection } from "./section/data-ortu";
import { DataNilaiSection } from "./section/data-nilai";
import { BerkasKhususSection } from "./section/berkas-khusus";
import { Button } from "@uninus/web/components";
import Link from "next/link";

export const ModuleBiodata: FC = (): ReactElement => {
  return (
    <section
      key="dashboard-biodata"
      className="flex flex-col text-center px-4 gap-y-6  lg:text-start"
    >
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5">
          PMB <span className="text-secondary-green-4"> / Registrasi</span>
        </h1>
        <p className=" text-lg 2xl:text-2xl font-extrabold pt-2 text-secondary-green-4">
          Pengisian Data Diri
        </p>
      </div>

      <section className="flex flex-col gap-4 w-full bg-primary-white p-8 rounded-lg shadow-lg">
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
          <Link href="/dashboard/registrasi/beasiswa" className="grid place-items-center">
            Beasiswa
          </Link>
        </div>
      </section>
    </section>
  );
};
