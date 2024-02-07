import { ReactElement } from "react";
import { NextPage } from "next";
import { Metadata } from "next";
import { LoginEvaluasiDosenModule } from "../_modules";

export const metadata: Metadata = {
  title: "Evaluasi",
};

const EvaluasiLoginPage: NextPage = (): ReactElement => (
  <section key="login-evaluasi">
    <LoginEvaluasiDosenModule key="auth-admin-evaluasi" />
  </section>
);
export default EvaluasiLoginPage;
