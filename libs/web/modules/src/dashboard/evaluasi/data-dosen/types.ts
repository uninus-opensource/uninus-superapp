import { ReactNode } from "react";

export type TDataDosen = {
  no?: number | string;
  name: string;
  detail: string;
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
  status?: "Aktif" | "Tidak Aktif" | "Sakit" | "Cuti";
  tindakan?: string;
};

export type TColumnDosen = {
  name: ReactNode;
  item: ReactNode;
};
