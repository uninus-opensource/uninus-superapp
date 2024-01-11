import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { BeasiswaDashboardModule } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Dashboard PMB | Beasiswa",
  description: "Beasiswa Dashboard PMB",
};

const DashboardBeasiswa: NextPage = (): ReactElement => (
  <section key="dashboard-beasiswa">
    <BeasiswaDashboardModule key={"beasiswa"} />
  </section>
);
export default DashboardBeasiswa;
