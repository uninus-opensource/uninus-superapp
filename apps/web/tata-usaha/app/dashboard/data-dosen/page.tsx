import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { DashboardDataDosenTataUsahaModule } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Tata Usaha | Data Dosen",
  description: "Data Dosen",
};

const DashboradDataMahasiswaTataUsaha: NextPage = (): ReactElement => {
  return <DashboardDataDosenTataUsahaModule />;
};

export default DashboradDataMahasiswaTataUsaha;
