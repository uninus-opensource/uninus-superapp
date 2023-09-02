import { ModuleDokumen } from "@uninus/web/modules";
import { Metadata, NextPage } from "next";
import { ReactElement } from "react";

export const metadata: Metadata = {
  title: "Dashboard PMB | Dokumen",
  description: "Form Dokumen Dashboard PMB",
};

const DashboardDokumen: NextPage = (): ReactElement => <ModuleDokumen key="dashboard-dokumen" />;
export default DashboardDokumen;
