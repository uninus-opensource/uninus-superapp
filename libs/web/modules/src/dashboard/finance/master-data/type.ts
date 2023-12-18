export type TDataProdi = {
  id?: string;
  prodi?: string;
  angkatan?: number;
  jumlahMahasiswa?: Array<{ lunas?: number; cicil?: number; belum?: number }>;

  total_kewajiban?: number | string;
  telah_terbayaran?: string;
  belum_bayar?: string;
};
