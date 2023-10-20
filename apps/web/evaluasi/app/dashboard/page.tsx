import { ModuleHomepage } from "@uninus/web/modules";
import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Evaluasi Dosen | Beranda",
  description: "Beranda Edom",
};

const DashboardHome: NextPage = (): ReactElement => <ModuleHomepage />;
export default DashboardHome;
