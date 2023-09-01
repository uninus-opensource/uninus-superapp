import { ReactElement } from "react";
import { NextPage } from "next";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evaluasi",
};

const LandingPage: NextPage = (): ReactElement => (
  <section key="landing-page">
    <h1>Ini evaluasi</h1>
  </section>
);
export default LandingPage;
