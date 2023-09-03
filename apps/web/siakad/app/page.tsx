import { ReactElement } from "react";
import { NextPage } from "next";
import { Metadata } from "next";
import { LoginAdminModule } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Siakad",
};

const LandingSiakad: NextPage = (): ReactElement => (
  <section key="landing-siakad">
    <LoginAdminModule />
  </section>
);
export default LandingSiakad;
