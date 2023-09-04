import { NextPage } from "next";
import { ReactElement } from "react";
import { ModuleSelectionTest } from "@uninus/web/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard PMB | Tes Seleksi",
  description: "Tes Seleksi Dashboard PMB",
};

const SelectionPage: NextPage = (): ReactElement => <ModuleSelectionTest key="seleksi" />;
export default SelectionPage;
