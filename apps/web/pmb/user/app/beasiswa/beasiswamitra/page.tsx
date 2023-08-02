import { ReactElement } from "react";
import { NextPage } from "next";
import { ModuleMitra } from "@uninus/web/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beasiswa | Beasiswa Mitra",
};

const MitraPage: NextPage = (): ReactElement => <ModuleMitra />;

export default MitraPage;
