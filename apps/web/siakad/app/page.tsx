import { ReactElement } from "react";
import { NextPage } from "next";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Siakad",
};

const LandingSiakad: NextPage = (): ReactElement => (
  <section key="landing-siakad">
    <h1>Ini Siakad</h1>
  </section>
);
export default LandingSiakad;
