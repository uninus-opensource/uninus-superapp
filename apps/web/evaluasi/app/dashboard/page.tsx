import { Metadata, NextPage } from "next";
import { ReactElement } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};
const DashboardAdminEvaluasi: NextPage = (): ReactElement => {
  return (
    <section>
      <h1>Ini dashboard Evaluasi</h1>
    </section>
  );
};
export default DashboardAdminEvaluasi;
