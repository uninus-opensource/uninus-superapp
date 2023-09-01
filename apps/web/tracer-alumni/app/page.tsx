import { ReactElement } from "react";
import { NextPage } from "next";
import { Metadata } from "next";
import { LoginTracerAlumni } from "@uninus/web/modules";
export const metadata: Metadata = {
  title: "Tracer Alumni",
};

const LandingTracerAlumniPage: NextPage = (): ReactElement => (
  <LoginTracerAlumni key="auth-admin-keuangan" />
);
export default LandingTracerAlumniPage;
