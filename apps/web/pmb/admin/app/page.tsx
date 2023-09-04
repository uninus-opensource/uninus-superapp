import { NextPage } from "next";
import { Fragment, ReactElement } from "react";
import { Metadata } from "next";
import { LoginAdminModule } from "@uninus/web/modules";
import Head from "next/head";

export const metadata: Metadata = {
  title: "PMB-Admin | Masuk",
};

const LoginPageAdmin: NextPage = (): ReactElement => (
  <Fragment>
    <Head>
      <link rel="icon" href="/logo.svg" />
    </Head>
    <section key="login-admin-pmb">
      <LoginAdminModule key="auth-admin-pmb" />
    </section>
  </Fragment>
);
export default LoginPageAdmin;
