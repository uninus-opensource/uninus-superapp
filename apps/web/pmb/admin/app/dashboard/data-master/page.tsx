import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { ModuleDataMaster } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Dashboard Admin | Data Master",
  description: "Data Master Dashboard Admin",
};

const DashboardDataMaster: NextPage = (): ReactElement => <ModuleDataMaster />;

export default DashboardDataMaster;
