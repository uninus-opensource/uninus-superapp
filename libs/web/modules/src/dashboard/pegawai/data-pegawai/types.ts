export type TDataPegawai = {
  no?: number | string;
  name: string;
  nip: string;
  nidn: string;
  dosen_status: string;
  sk_pengangkatan: string;
  sk_mengajar?: string;
  lingkup_kerja: Array<{
    nama: string;
    link: string;
  }>;
  unit_kerja: Array<{
    nama: string;
    link: string;
  }>;
  jafung?: Array<{
    nama: string;
    link: string;
  }>;
  fakultas: Array<{
    nama: string;
  }>;
  prodi: Array<{
    nama: string;
  }>;
  tugas_tambahan: Array<{
    nama: string;
    link: string;
  }>;
  sertifikat_pendidik: string;
  sertifikat_profesi: string;
  status: "Aktif" | "Tidak Aktif" | "Sakit" | "Cuti";
  tindakan: string;
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
