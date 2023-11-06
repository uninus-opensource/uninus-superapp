import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { DashboardModuleSiakad } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Dashboard Siakad | Beranda",
  description: "Beranda Siakad",
};

const DashboardHome: NextPage = (): ReactElement => {
  return <DashboardModuleSiakad />;
};
export default DashboardHome;
