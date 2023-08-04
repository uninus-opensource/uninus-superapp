import { NextPage } from "next";
import { ReactElement } from "react";
import { LoginUserModule } from "@uninus/web/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PMB | Masuk",
};

const LoginPage: NextPage = (): ReactElement => <LoginUserModule key={"login"} />;
export default LoginPage;
