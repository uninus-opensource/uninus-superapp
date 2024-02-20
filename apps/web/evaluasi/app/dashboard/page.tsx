import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { DashboardModuleEdom } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Dashboard Evaluasi Dosen | Beranda",
  description: "Beranda Edom",
};

const DashboardHome: NextPage = (): ReactElement => <DashboardModuleEdom />;
export default DashboardHome;
