import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { ModuleHomepageSiakad } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Dashboard Siakad | Beranda",
  description: "Beranda Siakad",
};

const DashboardHome: NextPage = (): ReactElement => {
  return <ModuleHomepageSiakad />;
};
export default DashboardHome;
