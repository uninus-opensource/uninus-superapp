import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { ModuleDataBayar } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Dashboard Admin | Data Bayar",
  description: "Data Akun Dashboard Admin",
};

const DashboardDataBayar: NextPage = (): ReactElement => <ModuleDataBayar />;

export default DashboardDataBayar;
