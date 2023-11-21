import { MenuBiayaKuliah } from "@uninus/web/modules";
import { Metadata } from "next";
import { FC, ReactElement } from "react";

export const metadata: Metadata = {
  title: "Dashboard Siakad | Biaya Kuliah",
  description: "Biaya Kuliah",
};
const DashbordBiayaKuliah: FC = (): ReactElement => {
  return <MenuBiayaKuliah />;
};

export default DashbordBiayaKuliah;
