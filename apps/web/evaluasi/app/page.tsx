import { Fragment, ReactElement } from "react";
import { NextPage } from "next";
import { Metadata } from "next";
import { LoginEvaluasiDosenModule } from "@uninus/web/modules";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Evaluasi",
};

const LandingPage: NextPage = (): ReactElement => (
  <Fragment>
    {/* <Head>
      <link rel="icon" href="/logo.ico" />
    </Head> */}
    <section key="login-evaluasi">
      <LoginEvaluasiDosenModule key="auth-admin-evaluasi" />
    </section>
  </Fragment>
);
export default LandingPage;
