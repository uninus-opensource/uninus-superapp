import { TDataTransaksi } from "./type";

export const DataMahasiswa = {
  name: "Mawar Saidah",
  mother_name: "Ani",
  nim: 41058001100031,
  semester: 1,
  school_year: "2023/2024",
};
export const DataTransaksi: TDataTransaksi[] = [
  {
    jenis_pembayaran: "Uang Registrasi 2023/2024 ",
    total: "Rp 650.000,-",
    status: "Sudah Bayar",
  },
  {
    jenis_pembayaran: "SPP Ganjil 2023/2024 ",
    total: "Rp 6.750.000,-",
    status: "Belum Bayar",
  },
];
