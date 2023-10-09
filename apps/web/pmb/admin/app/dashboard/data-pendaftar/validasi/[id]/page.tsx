import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { ModuleValidasiDataPendaftar } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Dashboard Admin | Data Pendaftar",
  description: "Data Pendaftar Dashboard Admin",
};

const ValidasiDataPendaftar: NextPage = (): ReactElement => (
  <ModuleValidasiDataPendaftar key={"module-validasi-data-pendaftar"} />
);

export default ValidasiDataPendaftar;
