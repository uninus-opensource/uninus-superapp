import { ReactNode } from "react";

export type TDataPegawai = {
  no?: number | string;
  name: string;
  nip: string;
  nidn: string;
  dosen_status?: Array<{
    nama: string;
    link: string;
  }>;
  sk_pengangkatan?: string;
  sk_mengajar?: string;
  lingkup_kerja?: Array<{
    nama: string;
    link: string;
  }>;
  unit_kerja?: Array<{
    nama: string;
    link: string;
  }>;
  jafung?: Array<{
    nama: string;
    link: string;
  }>;
  golongan?: Array<{
    nama: string;
    link: string;
  }>;
  fakultas?: Array<{
    nama: string;
  }>;
  prodi?: Array<{
    nama: string;
  }>;
  tugas_tambahan?: Array<{
    nama: string;
    link: string;
  }>;
  sertifikat_pendidik?: string;
  sertifikat_profesi?: string;
  status?: "aktif" | "tidak_aktif" | "sakit" | "cuti";
  tindakan?: string;
};

export type TColumnPegawai = {
  name: ReactNode;
  item: ReactNode;
};

export type TDetailModalPegawai = {
  page: number | null;
};
