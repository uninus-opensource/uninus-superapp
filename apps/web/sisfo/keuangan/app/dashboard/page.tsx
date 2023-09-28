import { Metadata, NextPage } from "next";
import { ReactElement } from "react";

export const metadata: Metadata = {
  title: "Dashboard | Keuangan",
};
const DashboardAdminKeuagan: NextPage = (): ReactElement => {
  return (
    <section>
      <h1>Ini dashboard Keuangan</h1>
    </section>
  );
};
export default DashboardAdminKeuagan;
