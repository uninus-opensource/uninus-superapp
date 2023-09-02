import { ReactElement } from "react";
import { NextPage } from "next";
import { Metadata } from "next";
import { LoginAdminKeuanganModule } from "@uninus/web/modules";
export const metadata: Metadata = {
  title: "Keuangan",
};

const LandingAdminKeuanganPage: NextPage = (): ReactElement => (
  <LoginAdminKeuanganModule key="auth-admin-keuangan" />
);
export default LandingAdminKeuanganPage;
