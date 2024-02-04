import { auth } from "@uninus/web/services";
import { NextPage } from "next";
import { ReactElement } from "react";

const Dashboard: NextPage = async (): Promise<ReactElement> => {
  const session = await auth();
  return <span>Dashboard {JSON.stringify(session)}</span>;
};

export default Dashboard;
