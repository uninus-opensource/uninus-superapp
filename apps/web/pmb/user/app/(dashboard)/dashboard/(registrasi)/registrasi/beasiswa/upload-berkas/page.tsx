import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { BeasiswaUploadBerkasDashboardModule } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Dashboard PMB | Beasiswa",
  description: "Upload Berkas Beasiswa Dashboard PMB",
};

const DashboardBeasiswaUploadBerkas: NextPage = (): ReactElement => (
  <section key="dashboard-beasiswa-upload-berkas">
    <BeasiswaUploadBerkasDashboardModule key={"beasiswa-upload-berkas"} />
  </section>
);
export default DashboardBeasiswaUploadBerkas;
