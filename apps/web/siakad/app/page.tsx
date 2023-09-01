import { ReactElement } from "react";
import { NextPage } from "next";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Siakad",
};

const LandingPage: NextPage = (): ReactElement => (
  <section key="landing-page">
    <h1 className="text-primary-green">Hallo Ini Siakad</h1>
  </section>
);
export default LandingPage;
