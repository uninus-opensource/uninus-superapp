import { VerifEmailModule } from "@uninus/web/modules";
import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PMB | Verifikasi",
};

const verifEmail: NextPage = (): ReactElement => <VerifEmailModule key={"verifEmail"} />;
export default verifEmail;
