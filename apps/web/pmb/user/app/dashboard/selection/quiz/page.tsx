import { NextPage } from "next";
import { ReactElement } from "react";
import { QuizModule } from "@uninus/web/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard PMB | Tes Seleksi",
};

const QuizPage: NextPage = (): ReactElement => <QuizModule key={"quiz"} />;

export default QuizPage;
