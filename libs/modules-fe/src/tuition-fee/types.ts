export type TProgramSarjana = {
  ukt: string;
  program_studi: string
}

export type TTableSarjana = TProgramSarjana & { fakultas: string }

export type TTableMagister = TProgramSarjana
