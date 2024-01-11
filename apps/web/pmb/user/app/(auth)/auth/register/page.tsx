import { NextPage } from "next";
import { ReactElement } from "react";
import { RegisterModule } from "@uninus/web/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PMB | Pendaftaran",
};

const RegisternPage: NextPage = (): ReactElement => <RegisterModule key="auth-register" />;
export default RegisternPage;
