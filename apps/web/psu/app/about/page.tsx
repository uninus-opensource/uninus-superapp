import { Metadata } from "next";
import { ReactElement } from "react";
import { PsuAboutModule } from "@uninus/web/modules";
import { NextPage } from "next";

export const metadata: Metadata = {
  title: "PSU",
  description: "PSU Company Profile",
  icons: {
    icon: "/icon.ico",
  },
};

const PsuAboutWeb: NextPage = () : ReactElement => {
  return (
    <PsuAboutModule/>
  );
}

export default PsuAboutWeb;
