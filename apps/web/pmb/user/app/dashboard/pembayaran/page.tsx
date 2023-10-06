import { ModulePembayaran } from "@uninus/web/modules";
import { Metadata, NextPage } from "next";
import { ReactElement } from "react";

export const metadata: Metadata = {
  title: "Dashboard PMB | Pembayaran",
  description: "Pembayaran Dashboard PMB",
};
const DashboarPembayaran: NextPage = (): ReactElement => (
  <ModulePembayaran key="dashboard-pembayaran" />
);
export default DashboarPembayaran;
