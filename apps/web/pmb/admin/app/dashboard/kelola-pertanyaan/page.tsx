import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { ModuleKelolaPertanyaan } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Dashboard Admin | Kelola Pertanyaan",
  description: "Kelola Pertanyaan Dashboard Admin",
};

const DashboardKelolaPertanyaan: NextPage = (): ReactElement => <ModuleKelolaPertanyaan />;

export default DashboardKelolaPertanyaan;
