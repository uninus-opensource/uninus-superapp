import { FC, ReactElement } from "react";

import { PDFViewer } from "@react-pdf/renderer";
import { KartuPendaftaran } from "..";

export const viewPendaftaran: FC = (): ReactElement => {
  return (
    <section className="w-full h-screen overflow-hidden flex justify-center items-center">
      <PDFViewer style={{ width: "100%", height: "100%" }}>
        <KartuPendaftaran />
      </PDFViewer>
    </section>
  );
};
