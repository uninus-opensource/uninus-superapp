import { Metadata } from "next";
import "react-alice-carousel/lib/alice-carousel.css";
import { ReactElement } from "react";
import { PsuWebModule } from "@uninus/web/modules";
import { NextPage } from "next";

export const metadata: Metadata = {
  title: "PSU",
  description: "PSU Company Profile",
  icons: {
    icon: "/icon.ico",
  },
};

const PsuWeb: NextPage = () : ReactElement => {
  return (
    <PsuWebModule/>
  );
}

export default PsuWeb;
