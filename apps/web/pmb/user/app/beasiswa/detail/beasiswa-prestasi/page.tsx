import { ReactElement } from "react";
import { NextPage } from "next";
import { ModulePrestasi } from "@uninus/web/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beasiswa | Beasiswa Prestasi",
  description: "Beasiswa Prestasi PMB",
};

const BeasiswaPrestasi: NextPage = (): ReactElement => <ModulePrestasi key="beasiswa-prestasi" />;
export default BeasiswaPrestasi;
