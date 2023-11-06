import { ReactNode } from "react";

export type TDataMataKuliah = {
  kode_mk: string;
  nama_mk: string;
  sks: string;
  kelas: string;
  jadwal: string;
  ruangan: string;
  dosen: string;
  status: "Disetujui" | "Belum Disetujui";
};

export type TColumnPegawai = {
  name: ReactNode;
  item: ReactNode;
};
