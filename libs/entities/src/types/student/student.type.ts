import { TFIle } from "../file";
import { Prisma } from "@prisma/client";

export interface IGetStudentRequest {
  id?: string;
}

export interface IStudentData {
  email?: string | null;
  fullname?: string | null;
  first_department_id?: number | null | string;
  second_department_id?: number | null | string;
  selection_path_id?: number | null | string;
  registration_path_id?: number | null | string;
  degree_program_id?: number | null | string;
  nik?: string | null;
  nisn?: string | null;
  no_kk?: string | null;
  gender_id?: number | null | string;
  religion_id?: number | null | string;
  birth_place?: string | null;
  birth_date?: string | null;
  phone_number?: string | null;
  citizenship_id?: number | null | string;
  marital_status_id?: number | null | string;
  country_id?: number | null | string;
  address?: string | null;
  subdistrict_id?: number | null | string;
  province_id?: number | null | string;
  city_id?: number | null | string;
  education_type_id?: number | null | string;
  education_major_id?: number | null | string;
  graduation_year?: string | null;
  education_npsn?: string | null;
  father_name?: string | null;
  father_status_id?: number | null | string;
  father_education_id?: number | null | string;
  father_occupation_id?: number | null | string;
  father_position?: string | null;
  father_salary_id?: number | null | string;
  mother_name?: string | null;
  mother_status_id?: number | null | string;
  mother_education_id?: number | null | string;
  mother_occupation_id?: number | null | string;
  mother_position?: string | null;
  mother_salary_id?: number | null | string;
  guardian_name?: string | null;
  guardian_status_id?: number | null | string;
  guardian_education_id?: number | null | string;
  guardian_occupation_id?: number | null | string;
  guardian_position?: string | null;
  guardian_salary_id?: number | null | string;
  guardian_province_id?: number | null | string;
  guardian_subdistrict_id?: number | null | string;
  guardian_city_id?: number | null | string;
  guardian_address?: string | null;
  parent_province_id?: number | null | string;
  parent_subdistrict_id?: number | null | string;
  parent_city_id?: number | null | string;
  parent_address?: string | null;
  scholarship_id?: number | null | string;
  disabilities_id?: number | null | string;
  faculty_id?: number | null | string;
  department_id?: number | null | string;
  academic_year?: string | null;
  salary_id?: number | null | string;
  occupation_id?: number | null | string;
  company_name?: string | null;
  company_address?: string | null;
  occupation_position?: string | null;
  utbk_pu?: number | null;
  utbk_kk?: number | null;
  utbk_ppu?: number | null;
  utbk_kmbm?: number | null;
  average_utbk?: number | null;
  average_grade?: number | null;
  registration_status_id?: number | null | string;
  registration_status?: string | null;
  utbk?: number | null;
  test_score?: number | null;
  registration_number?: string | null;
  payment?: Array<{
    id?: string;
    order_id?: string;
    payment_method?: string;
    payment_code?: string;
    payment_bank?: string;
    isPaid?: boolean;
    amount?: number;
    name?: string;
  }>;
}

export interface IGetStudentResponse extends IStudentData {
  avatar: string | null;
  documents?: Array<{
    id?: string;
    isVerified?: boolean;
    name: string;
    path: string;
  }> | null;
  student_grade?: Array<{
    id: string;
    subject: string | null;
    semester: string | null;
    grade: number | null;
  }>;
}

export interface IDeleteStudentRequest extends IGetStudentRequest {
  id: string;
}

export type TDeleteStudentResponse = {
  message: string;
};

export interface IUpdateStudentResponse extends IStudentData {
  message?: string;
  avatar?: string | null | TFIle;
  student_grade?: Array<{
    id?: string;
    subject: string | null;
    semester: string | null;
    grade: number | null;
  }>;
  documents?: Array<{
    id?: string;
    isVerified?: boolean;
    name?: string;
    path?: string;
  }> | null;
}
export interface IUpdateStudentRequest extends IGetStudentRequest, IStudentData {
  education_name?: string | null;
  education_province?: string | null;
  education_district_city?: string | null;
  education_sub_district?: string | null;
  education_street_address?: string | null;
  avatar?: string | null;
  document?: {
    name: string;
    path: string;
  } | null;
  documents?: Array<{
    id?: string;
    isVerified?: boolean;
    name?: string;
    path?: string;
  }> | null;
  student_grade?: Array<{
    id?: string;
    subject: string | null;
    semester: string | null;
    grade: number | null;
  }>;
}

export interface IUpdateStudentRequestFE extends IStudentData {
  avatar?: string | null;
}

export interface IUpdateStudentGradeResponse extends IStudentData {
  student_grade: Array<{
    subject: string;
    semester: string;
    grade: number;
  }>;
}
export interface IUpdateStudentGradeRequest extends IStudentData {
  student_grade: Array<{
    subject: string;
    semester: string;
    grade: number;
  }>;
}

export interface IGetUserMeResponse extends IGetStudentRequest {
  registration_status: string | null;
  email: string | null;
  fullname: string | null;
  avatar: string | null;
}

export type TGetUserDataResponse = {
  data: Array<{
    id: string;
    fullname?: string | null;
    role: { id?: number; name?: string };
    email?: string | null;
    password?: string | null;
    phone_number?: string | null;
  }>;
};

export type TStudentsPaginatonResponse = {
  data: Array<object>;
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev?: null | number;
    next?: null | number;
  };
};

export type TStudentsPaginationArgs = {
  search?: string;
  orderBy?: Prisma.PMBOrderByWithRelationInput;
  page?: number;
  perPage?: number;
};
