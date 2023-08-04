import { NextPage } from "next";
import { ReactElement } from "react";
import { ModuleBiodata } from "@uninus/web/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard PMB | Form Data Diri",
};

const DashboardBiodata: NextPage = (): ReactElement => <ModuleBiodata key={"biodata"} />;
export default DashboardBiodata;
