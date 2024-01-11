import { ReactElement } from "react";
import { NextPage } from "next";
import { ModuleUnggul } from "@uninus/web/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beasiswa | Beasiswa Unggul",
  description: "Beasiswa Unggul PMB",
};

const BeasiswaUnggul: NextPage = (): ReactElement => <ModuleUnggul key="beasiswa-unggul" />;
export default BeasiswaUnggul;
