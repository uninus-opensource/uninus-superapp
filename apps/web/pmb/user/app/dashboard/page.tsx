import { DashboardModule } from "@uninus/web/modules";
import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard PMB | Beranda",
  description: "Beranda PMB",
};

const DashboardHome: NextPage = (): ReactElement => <DashboardModule key="beranda" />;
export default DashboardHome;
