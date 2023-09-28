import { ReactElement } from "react";
import { NextPage } from "next";
import { Metadata } from "next";
import { LoginSiakadModule } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Siakad",
};

const SiakadPage: NextPage = (): ReactElement => <LoginSiakadModule key="auth-siakad" />;
export default SiakadPage;
