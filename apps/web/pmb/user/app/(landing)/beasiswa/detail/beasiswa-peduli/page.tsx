import { ReactElement } from "react";
import { NextPage } from "next";
import { ModulePeduli } from "@uninus/web/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beasiswa | Beasiswa Prestasi",
  description: "Beasiswa Prestasi PMB",
};

const BeasiswaPeduli: NextPage = (): ReactElement => <ModulePeduli key="beasiswa-peduli" />;
export default BeasiswaPeduli;
