import { Fragment, ReactElement } from "react";
import { NextPage } from "next";
import { LandingModule } from "@uninus/web/modules";
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "PMB | Beranda",
  description: "Beranda PMB",
};

const LandingPage: NextPage = (): ReactElement => (
  <Fragment>
    <Head>
      <link rel="icon" href="/logo.ico" />
    </Head>
    <section key="landing-page">
      <LandingModule key="landing" />
    </section>
  </Fragment>
);
export default LandingPage;
