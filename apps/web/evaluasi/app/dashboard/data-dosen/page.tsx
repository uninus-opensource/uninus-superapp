import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { ModuleDataDosenEdom } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Dashboard Evaluasi Dosen | Data Dosen",
  description: "Beranda Edom",
};

const DashboardHome: NextPage = (): ReactElement => <ModuleDataDosenEdom />;
export default DashboardHome;
