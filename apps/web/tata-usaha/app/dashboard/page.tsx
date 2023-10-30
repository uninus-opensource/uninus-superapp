import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { DashboardTataUsahaModule } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Dashboard Tata Usaha | Beranda",
  description: "Beranda Tata Usaha",
};

const DashboardHome: NextPage = (): ReactElement => {
  return <DashboardTataUsahaModule />;
};
export default DashboardHome;
