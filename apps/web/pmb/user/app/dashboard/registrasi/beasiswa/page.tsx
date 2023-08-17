import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { BeasiswaDashboardModule } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Dashboard PMB | Form Data Diri",
};

const DashboardBeasiswa: NextPage = (): ReactElement => (
  <BeasiswaDashboardModule key={"beasiswa"} />
);
export default DashboardBeasiswa;
