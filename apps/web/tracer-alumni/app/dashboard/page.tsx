import { DashboardModuleTracerALumni } from "@uninus/web/modules";
import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard PMB | Beranda",
  description: "Beranda PMB",
};

const DashboardHomeTracerAlumni: NextPage = (): ReactElement => <DashboardModuleTracerALumni />;
export default DashboardHomeTracerAlumni;
