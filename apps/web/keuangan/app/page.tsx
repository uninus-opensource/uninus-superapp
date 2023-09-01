import { ReactElement } from "react";
import { NextPage } from "next";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keuangan",
};

const LandingAdminKeuanganPage: NextPage = (): ReactElement => (
  <section key="landing-page">
    <h1 className="text-primary-green">Hallo Ini Web Keuangan</h1>
  </section>
);
export default LandingAdminKeuanganPage;
