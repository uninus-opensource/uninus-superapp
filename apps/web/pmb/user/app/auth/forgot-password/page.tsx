import { NextPage } from "next";
import { ReactElement } from "react";
import { ForgotModule } from "@uninus/web/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PMB | Lupa Password",
};

const forgotPassword: NextPage = (): ReactElement => <ForgotModule key={"forgot"} />;
export default forgotPassword;
