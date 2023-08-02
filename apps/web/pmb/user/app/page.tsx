import { ReactElement } from "react";
import { NextPage } from "next";
import { LandingModule } from "@uninus/web/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PMB | Beranda",
};

const LandingPage: NextPage = (): ReactElement => <LandingModule />;
export default LandingPage;
