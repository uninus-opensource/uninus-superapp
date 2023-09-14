export type TDataPegawai = {
  no?: number | string;
  name: string;
  nip: string;
  faculty: string;
  major: string;
  jafung: string;
  job_unit: string;
  sk: string;
  lecturer_certificate: string;
  profession_certificate: string;
  status: "Aktif" | "Tidak Aktif";
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
