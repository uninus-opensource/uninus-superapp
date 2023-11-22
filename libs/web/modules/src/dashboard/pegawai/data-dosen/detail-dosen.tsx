import { FC, ReactElement } from "react";
import { TDetailModalPegawai } from "./types";

export const DetailDosen: FC<TDetailModalPegawai> = ({ page }): ReactElement => {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center">
      {page === 1 && <div>Data Diri</div>}

      {page === 2 && <div>Data Pendidikan</div>}

      {page === 3 && <div>Surat Keterangan</div>}

      {page === 4 && <div>Data Keluarga</div>}
    </section>
  );
};
