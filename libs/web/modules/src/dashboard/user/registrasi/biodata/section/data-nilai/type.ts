export type NilaiValues = {
  mtk1: number | string;
  mtk2: number | string;
  mtk3: number | string;
  mtk4: number | string;
  bind1: number | string;
  bind2: number | string;
  bind3: number | string;
  bind4: number | string;
  bing1: number | string;
  bing2: number | string;
  bing3: number | string;
  bing4: number | string;
  utbk: number | string;
  average_grade: number;
  semester: string | number;
  subject: string | number;
  student_grade: Array<{
    subject: string | number;
    semester: string | number;
    grade: number | number;
  }>;
};
