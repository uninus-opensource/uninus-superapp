import { ReactElement } from "react";
import { NextPage } from "next";
import { LandingModule } from "@uninus/web/modules";
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "PMB | Beranda",
};

const LandingPage: NextPage = (): ReactElement => (
  <section key="landing-page">
    <Head>
      <link rel="icon" href="/logo.ico" />
    </Head>
    <LandingModule key="landing" />
  </section>
);
export default LandingPage;
