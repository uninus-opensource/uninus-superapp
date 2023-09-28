import { Fragment, ReactElement } from "react";
import { NextPage } from "next";
import { Metadata } from "next";
import { LoginAdminKeuanganModule } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Keuangan",
};

const LoginPageAdminKeuangan: NextPage = (): ReactElement => (
  <Fragment>
    <section key="login-keuangan">
      <LoginAdminKeuanganModule key="auth-admin-keuangan" />
    </section>
  </Fragment>
);
export default LoginPageAdminKeuangan;
