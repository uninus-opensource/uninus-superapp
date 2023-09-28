import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { ModuleDataPendaftar } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Dashboard Admin | Data Pendaftar",
  description: "Data Pendaftar Dashboard Admin",
};

const DashboardDataPendaftar: NextPage = (): ReactElement => <ModuleDataPendaftar />;

export default DashboardDataPendaftar;
