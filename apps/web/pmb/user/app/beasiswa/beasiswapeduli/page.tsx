import { ReactElement } from "react";
import { NextPage } from "next";
import { ModulePeduli } from "@uninus/web/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beasiswa | Beasiswa Prestasi",
};

const BeasiswaPeduli: NextPage = (): ReactElement => <ModulePeduli key={"beasiswapeduli"} />;
export default BeasiswaPeduli;
