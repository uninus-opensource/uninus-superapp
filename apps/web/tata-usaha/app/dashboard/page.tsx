import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Tata Usaha | Beranda",
  description: "Beranda Tata Usaha",
};

const DashboardHome: NextPage = (): ReactElement => {
  return (
    <section className="flex justify-center items-center h-screen w-full">
      <h1>Ini Dashboard Tata usaha</h1>
    </section>
  );
};
export default DashboardHome;
