import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { LoginAdminModule } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "PMB-Admin | Masuk",
  description: "Masuk PMB-Admin",
  icons: {
    icon: "logo.sgv",
  },
};

const LoginPageAdmin: NextPage = (): ReactElement => (
  <section key="login-admin-pmb">
    <LoginAdminModule key="auth-admin-pmb" />
  </section>
);
export default LoginPageAdmin;
