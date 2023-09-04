import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Admin | Data Pendaftar",
  description: "Data Pendaftar Dashboard Admin",
};

const DashboardDataPendaftar: NextPage = (): ReactElement => <h1>Ini Data Pendaftar</h1>;

export default DashboardDataPendaftar;
