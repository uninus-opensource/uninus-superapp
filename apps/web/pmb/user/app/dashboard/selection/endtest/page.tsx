import { ReactElement } from "react";
import { NextPage } from "next";
import { EndTestModule } from "@uninus/web/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard PMB | Tes Seleksi",
};

const EndTestPage: NextPage = (): ReactElement => <EndTestModule key={"test-selesai"} />;

export default EndTestPage;
