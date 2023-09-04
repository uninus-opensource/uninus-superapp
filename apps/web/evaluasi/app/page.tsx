import { ReactElement } from "react";
import { NextPage } from "next";
import { Metadata } from "next";
import { LoginEvaluasiDosenModule } from "@uninus/web/modules";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Evaluasi",
};

const LandingPage: NextPage = (): ReactElement => (
  <section key="login-evaluasi">
    <Head>
      <link rel="icon" href="/logo.ico" />
    </Head>
    <LoginEvaluasiDosenModule key="auth-admin-evaluasi" />
  </section>
);
export default LandingPage;
