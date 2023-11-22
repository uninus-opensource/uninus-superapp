export type TTextFieldOne = {
  name: "nik" | "nisn" | "phone_number" | "fullname" | "email";
  item: string;
  placeholder: string;
  type: "text";
  required: boolean;
  disabled: boolean;
};

export type TTextFieldTwo = {
  name: "rt" | "rw";
  item: string;
  type: "text";
};

export type TTextFieldThree = {
  name: "parent_rt" | "parent_rw";
  item: string;
  type: "text";
};

export type TTextFieldAyah = {
  name: "father_education" | "father_occupation" | "father_income";
  item: string;
  type: "text";
  className: string;
};

export type TTextFieldIbu = {
  name: "mother_education" | "mother_occupation" | "mother_income";
  item: string;
  type: "text";
  className: string;
};

export type NilaiValues = {
  mtk1: number;
  mtk2: number;
  mtk3: number;
  mtk4: number;
  bind1: number;
  bind2: number;
  bind3: number;
  bind4: number;
  bing1: number;
  bing2: number;
  bing3: number;
  bing4: number;
  utbk_kk: number | null;
  utbk_pu: number | null;
  utbk_ppu: number | null;
  utbk_kmbm: number | null;
  average_utbk: number | null;
  dokumen1: File;
  dokumen2: File;
  dokumen3: File;
  dokumen4: File;
  UTBK: File;
  average_grade: number;
  semester: string;
  subject: string;
  student_grade: Array<{
    subject: string;
    semester: string;
    grade: number;
  }>;
};

export type TUploadFileRequest = {
  file: File;
};

export type TUploadFileResponse = {
  file_name: string;
  file_url: string;
  mime: string;
};
