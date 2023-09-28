import { ReactElement } from "react";
import { NextPage } from "next";
import { Metadata } from "next";
import { LoginEvaluasiDosenModule } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Evaluasi",
};

const LandingPage: NextPage = (): ReactElement => (
  <section key="login-evaluasi">
    <LoginEvaluasiDosenModule key="auth-admin-evaluasi" />
  </section>
);
export default LandingPage;
