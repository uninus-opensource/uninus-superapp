import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { ModuleHasilEvaluasi } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Dashboard Evaluasi Dosen | Hasil Evaluasi",
  description: "Hasil Evaluasi",
};

const DashboardHome: NextPage = (): ReactElement => <ModuleHasilEvaluasi />;
export default DashboardHome;
