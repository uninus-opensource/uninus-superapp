export type TDataPendaftar = {
  no?: number;
  registration_number?: string;
  date_registration?: string;
  name?: string;
  prodi_1?: string;
  prodi_2?: string;
  seleksi?: string;
  rapot?: number;
  utbk?: number;
  status?: string;
};
export type TTextFieldOne = {
  name: "nik" | "nisn" | "phone_number" | "fullname" | "email";
  item: string;
  placeholder: string;
  type: "text";
};

export type TDataUser = {
  id?: number;
  registration_number?: number;
  average_grade?: number;
  average_utbk?: number;
  createdAt?: string;
  registration_path?: {
    id?: number;
    name?: string;
  };
  selection_path?: {
    id?: number;
    name?: string;
  };
  first_department?: {
    id?: number;
    name?: string;
  };
  second_department?: {
    id?: number;
    name?: string;
  };
  registration_status?: {
    id?: number;
    name?: string;
  };
  student?: {
    user?: {
      id?: number;
      fullname?: string;
    };
  };
};
