import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { LoginAdminModule } from "@uninus/web/modules";
import Head from "next/head";

export const metadata: Metadata = {
  title: "PMB-Admin | Masuk",
};

const LoginPageAdmin: NextPage = (): ReactElement => (
  <section key="login-admin-pmb">
    <Head>
      <link rel="icon" href="/logo.ico" />
    </Head>
    <LoginAdminModule key="auth-admin-pmb" />
  </section>
);
export default LoginPageAdmin;
