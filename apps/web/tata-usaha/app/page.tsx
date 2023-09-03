import { NextPage } from "next";
import { Metadata } from "next";
import { ReactElement } from "react";
import { LoginAdminTataUsahaModule } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Tata Usaha",
};

const TataUsahaPage: NextPage = (): ReactElement => (
  <LoginAdminTataUsahaModule key="auth-admin-tata-usaha" />
);
export default TataUsahaPage;
