import { NextPage } from "next";
import { ReactElement } from "react";
import { Pembayaran } from "@uninus/web/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard PMB | Registrasi Pembayaran",
  description: "Registrasi Pembayaran Dashboard PMB",
};

const DashboardPembayaran: NextPage = (): ReactElement => <Pembayaran key="regist-pembayaran" />;
export default DashboardPembayaran;
