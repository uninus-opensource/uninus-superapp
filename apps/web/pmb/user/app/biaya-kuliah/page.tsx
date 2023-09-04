import { TuitionFeeModule } from "@uninus/web/modules";
import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PMB | Biaya Kuliah",
  description: "Biaya Kuliah PMB",
};

const TuitionFeePage: NextPage = (): ReactElement => <TuitionFeeModule key="biaya-kuliah" />;
export default TuitionFeePage;
