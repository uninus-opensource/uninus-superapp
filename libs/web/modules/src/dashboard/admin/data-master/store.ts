import { TDataMaster } from "./type";

export const dataMaster: TDataMaster[] = [
  {
    name: "Biaya Formulir",
    current_data: [
      {
        data: "250.000",
      },
    ],
    add_data: false,
    title: "Biaya Formulir",
  },
  {
    name: "Program Studi",
    current_data: [
      {
        data: "S1-Pendidikan Agama Islam",
      },
      { data: "S1-Teknik Informatika" },
    ],
    add_data: true,
    title: "department",
  },
  {
    name: "Fakultas",
    current_data: [
      {
        data: "Fakultas Teknik",
      },
      { data: "Fakultas Pendidikan" },
    ],
    add_data: true,
    title: "faculty",
  },
  {
    name: "Jalur Seleksi",
    current_data: [
      {
        data: "Seleksi Prestasi Akademik",
      },
      { data: "Seleksi Prestasi Non Akademik" },
    ],
    add_data: true,
    title: "selection-path",
  },
  {
    name: "Data Sekolah",
    current_data: [
      {
        data: "SMA NEGERI ",
      },
      { data: "SMK NEGERI" },
    ],
    add_data: true,
    title: "school_type",
  },
  {
    name: "Beasiswa",
    current_data: [
      {
        data: "Beasiswa Nusantara",
      },
      { data: "Besiswa Nusantara Unggul" },
    ],
    add_data: true,
    title: "scholarship",
  },
];
