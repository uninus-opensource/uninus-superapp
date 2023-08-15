import { ProgramStudyModule } from "@uninus/web/modules";
import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PMB | Program Studi",
};

const ProgramStudiPage: NextPage = (): ReactElement => <ProgramStudyModule key="program-studi" />;
export default ProgramStudiPage;
