import { DashboardModuleAdmin } from "@uninus/web/modules";
import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard PMB-Admin | Beranda",
  description: "Dashboard PMB-Admin",
};

const DashboardHomeAdmin: NextPage = (): ReactElement => (
  <DashboardModuleAdmin key="dashboard-admin" />
);

export default DashboardHomeAdmin;
