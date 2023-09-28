import { ReactElement } from "react";
import { NextPage } from "next";
import { LoginTracerAlumni } from "@uninus/web/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tracer Alumni",
};

const TracerAlumniPage: NextPage = (): ReactElement => (
  <section key="landing-page">
    <LoginTracerAlumni key="login-tracer-alumni" />
  </section>
);
export default TracerAlumniPage;
