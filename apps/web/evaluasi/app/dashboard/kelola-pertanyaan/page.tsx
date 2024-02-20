import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { ModulePertanyaanEdom } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Dashboard Evaluasi Dosen | Kelola Pertanyaan",
  description: "Kelola Pertanyaan",
};

const DashboardHome: NextPage = (): ReactElement => <ModulePertanyaanEdom />;
export default DashboardHome;
