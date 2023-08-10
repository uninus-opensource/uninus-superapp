import { ReactElement } from "react";
import { NextPage } from "next";
import { IntructionTestModule } from "@uninus/web/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard PMB | Tes Seleksi",
};

const IntructionPage: NextPage = (): ReactElement => <IntructionTestModule key={"beasiswamitra"} />;

export default IntructionPage;
