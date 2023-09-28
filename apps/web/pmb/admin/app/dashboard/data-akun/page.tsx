import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { ModuleDataAkun } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Dashboard Admin | Data Akun",
  description: "Data Akun Dashboard Admin",
};

const DashboardDataAkun: NextPage = (): ReactElement => <ModuleDataAkun />;

export default DashboardDataAkun;
