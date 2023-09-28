import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
// import { useRouter } from "next/router";
import { ModuleEditDataPendaftar } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Dashboard Admin | Data Pendaftar",
  description: "Data Pendaftar Dashboard Admin",
};

const EditDataPendaftar: NextPage = (): ReactElement => (
  <ModuleEditDataPendaftar key={"module-edit-data-pendaftar"} />
);

export default EditDataPendaftar;
