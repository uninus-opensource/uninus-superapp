import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Siakad | Beranda",
  description: "Beranda Siakad",
};

const DashboardHome: NextPage = (): ReactElement => {
  return (
    <section className="flex justify-center items-center h-screen w-full">
      <h1>Ini Dashboard Siakad</h1>
    </section>
  );
};
export default DashboardHome;
