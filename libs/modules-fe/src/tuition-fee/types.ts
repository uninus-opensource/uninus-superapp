export type tableSarjana = {
  fakultas: string;
  program_studi: string;
  ukt: string;
};

export type tableMagister = {
  program_studi: string;
  ukt: string;
};

export type TSarjanaDataResponse = { getSarjanaData: tableSarjana[] };

export type TDataSarjanaQueryResponse = {
  getSarjanaQuery: string;
  setSarjanaQuery: (val: string) => void;
};

export type TMagisterDataResponse = { getMagisterData: tableMagister[] };

export type TDataMagisterQueryResponse = {
  getMagisterQuery: string;
  setMagisterQuery: (val: string) => void;
};
