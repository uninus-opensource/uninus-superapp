export type TDataCard = {
  desc?: string;
  jumlah?: string | number;
  background: string;
  tcolor: string;
  title: string;
  textColor?: string;
};
export type TDataBiayaKuliah = {
  kode_bayar: string;
  bayar: string;
  biaya: string;
  potongan: string;
  total_bayar: string;
  status: "Lunas" | "Belum Membayar";
};
