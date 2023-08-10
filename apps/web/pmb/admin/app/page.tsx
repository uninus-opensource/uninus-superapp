import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { LoginAdminModule } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "PMB-Admin | Masuk",
};

const LoginPageAdmin: NextPage = (): ReactElement => <LoginAdminModule />;
export default LoginPageAdmin;
