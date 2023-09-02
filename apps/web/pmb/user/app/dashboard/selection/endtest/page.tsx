import { ReactElement } from "react";
import { NextPage } from "next";
import { EndTestModule } from "@uninus/web/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard PMB | Tes Seleksi",
  description: "Tes Seleksi Dashboard PMB",
};

const EndTestPage: NextPage = (): ReactElement => <EndTestModule key="endtest" />;
export default EndTestPage;
