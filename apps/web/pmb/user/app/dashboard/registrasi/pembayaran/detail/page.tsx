import { NextPage } from "next";
import { ReactElement } from "react";
import { DetailPembayaran } from "@uninus/web/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard PMB | Detail Pembayaran",
};

const DashboardPembayaran: NextPage = (): ReactElement => (
  <DetailPembayaran key="detail-pembayaran" />
);
export default DashboardPembayaran;
