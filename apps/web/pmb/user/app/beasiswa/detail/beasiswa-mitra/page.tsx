import { ReactElement } from "react";
import { NextPage } from "next";
import { ModuleMitra } from "@uninus/web/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beasiswa | Beasiswa Mitra",
  description: "Beasiswa Mitra PMB",
};

const MitraPage: NextPage = (): ReactElement => <ModuleMitra key="beasiswa-mitra" />;
export default MitraPage;
