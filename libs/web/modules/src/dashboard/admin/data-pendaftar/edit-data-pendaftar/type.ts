export type TTabSection = {
  no: number;
  item: string;
};

export type NilaiValuesEdit = {
  mtk1?: number;
  mtk2?: number;
  mtk3?: number;
  mtk4?: number;
  bind1?: number;
  bind2?: number;
  bind3?: number;
  bind4?: number;
  bing1?: number;
  bing2?: number;
  bing3?: number;
  bing4?: number;
  utbk_kk?: number | null;
  utbk_pu?: number | null;
  utbk_ppu?: number | null;
  utbk_kmbm?: number | null;
  average_utbk?: number | null;
  average_grade?: number;
  semester?: string;
  subject?: string;
  student_grade?: Array<{
    subject?: string;
    semester?: string;
    grade?: number;
  }>;
};
