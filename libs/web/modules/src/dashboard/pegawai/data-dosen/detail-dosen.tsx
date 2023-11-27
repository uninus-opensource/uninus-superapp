import { FC, ReactElement } from "react";
import { TDetailModalPegawai } from "./types";
import { DataDiriDosen, DataPendidikaniDosen, SuratKeteranganiDosen } from "./detail-dosen-content";

export const DetailDosen: FC<TDetailModalPegawai> = ({ page }): ReactElement => {
  return (
    <section className="w-full h-full flex flex-col items-center overflow-auto">
      {page === 1 && <DataDiriDosen />}

      {page === 2 && <DataPendidikaniDosen />}

      {page === 3 && <SuratKeteranganiDosen />}

      {page === 4 && <DataPendidikaniDosen />}
    </section>
  );
};
