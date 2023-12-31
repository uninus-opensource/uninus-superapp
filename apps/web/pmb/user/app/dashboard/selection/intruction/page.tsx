import { ReactElement } from "react";
import { NextPage } from "next";
import { IntructionTestModule } from "@uninus/web/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard PMB | Tes Seleksi",
  description: "Tes Seleksi Dashboard PMB",
};

const IntructionPage: NextPage = (): ReactElement => <IntructionTestModule key="intruction" />;

export default IntructionPage;
