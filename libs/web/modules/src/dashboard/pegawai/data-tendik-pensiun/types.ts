import { ReactNode } from "react";

export type TDataPegawai = {
  no?: number | string;
  name: string;
  nip: string;
  nidn: string;
  tendik_status?: Array<{
    nama: string;
    link: string;
  }>;
  sk_pengangkatan?: string;
  lingkup_kerja?: Array<{
    nama: string;
    link: string;
  }>;
  unit_kerja?: Array<{
    nama: string;
    link: string;
  }>;
  golongan?: Array<{
    nama: string;
    link: string;
  }>;
  tugas_tambahan?: Array<{
    nama: string;
    link: string;
  }>;
  sertifikat_profesi?: string;
  status?: "Aktif" | "Tidak Aktif" | "Sakit" | "Cuti";
  sertifikat_pensiun?: string;
  tindakan?: string;
};

export type TColumnPegawai = {
  name: ReactNode;
  item: ReactNode;
};

// {
//   name: "Action",
//   width: "200px",
//   cell: (row) => (
//     <div className="flex gap-2 w-full">
//       <button className="flex w-full gap-2 bg-primary-green text-primary-white rounded-md p-1 px-3 items-center">
//         <div>
//           <FormOutlined />
//         </div>
//         Edit
//       </button>
//       <button className="flex w-full gap-2 bg-primary-yellow  rounded-md p-1 px-1 items-center">
//         <div>
//           <FileTextOutlined />
//         </div>
//         Validasi
//       </button>
//     </div>
//   ),
// },
