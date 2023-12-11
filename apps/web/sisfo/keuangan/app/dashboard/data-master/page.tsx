import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { MasterDataAdminKeuangan } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Dashboard Admin | Master Data",
  description: "Master Data Dashboard Admin",
};

const MasterDataPage: NextPage = (): ReactElement => <MasterDataAdminKeuangan />;

export default MasterDataPage;
