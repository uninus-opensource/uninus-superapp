import { Metadata, NextPage } from "next";
import { ReactElement } from "react";
import { DashboardModuleAdminKeuangan } from "@uninus/web/modules";
export const metadata: Metadata = {
  title: "Dashboard | Keuangan",
};
const DashboardAdminKeuagan: NextPage = (): ReactElement => {
  return (
    <section>
      <DashboardModuleAdminKeuangan />
    </section>
  );
};
export default DashboardAdminKeuagan;
