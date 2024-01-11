import { ReactElement } from "react";
import { NextPage } from "next";
import { ModulBeasiswa } from "@uninus/web/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PMB | Beasiswa",
  description: "Beasiswa PMB",
};

const BeasiswaPage: NextPage = (): ReactElement => <ModulBeasiswa key="beasiswa" />;
export default BeasiswaPage;
