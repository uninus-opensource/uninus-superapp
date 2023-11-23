import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { DashboardDataMahasiswaTataUsahaModule } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Tata Usaha | Data Mahasiswa",
  description: "Data Mahasiswa",
};

const DashboradDataMahasiswaTataUsaha: NextPage = (): ReactElement => {
  return <DashboardDataMahasiswaTataUsahaModule />;
};

export default DashboradDataMahasiswaTataUsaha;
