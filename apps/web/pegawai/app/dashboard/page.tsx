import { DashboardModule } from "@uninus/web/modules";
import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard PMB | Beranda",
  description: "Beranda PMB",
};

const DashboardHome: NextPage = (): ReactElement => {
  return (
    <section className="flex justify-center items-center h-screen w-full">
      <h1>Ini Dashboard Pegawai</h1>
    </section>
  );
};
export default DashboardHome;
