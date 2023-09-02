import { ReactElement } from "react";
import { NextPage } from "next";
import { LandingModule } from "@uninus/web/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PMB | Beranda",
  description: "Beranda PMB",
};

const LandingPage: NextPage = (): ReactElement => (
  <section key="landing-page">
    <LandingModule key="landing" />
  </section>
);
export default LandingPage;
