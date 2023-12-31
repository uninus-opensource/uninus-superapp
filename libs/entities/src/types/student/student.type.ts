import { TFIle } from "../file";
import { Prisma } from "@prisma/client";

export type TCreateQuestionRequest = {
  question: string;
  correct_answer: string;
  answers: { [key: string]: string };
};

export type TUpdateQuestionRequest = {
  id?: number;
  question: string;
  correct_answer: string;
  answers: { [key: string]: string };
};

export type TDeleteQuestionResponse = {
  message: string;
};

export interface IGetStudentRequest {
  id?: string;
}

export interface IStudentData {
  email?: string | null;
  fullname?: string | null;
  first_department_id?: number | null;
  second_department_id?: number | null;
  selection_path_id?: number | null;
  registration_path_id?: number | null;
  degree_program_id?: number | null;
  nik?: string | null;
  nisn?: string | null;
  no_kk?: string | null;
  gender_id?: number | null;
  religion_id?: number | null;
  birth_place?: string | null;
  birth_date?: string | null;
  phone_number?: string | null;
  citizenship_id?: number | null;
  marital_status_id?: number | null;
  country_id?: number | null;
  address?: string | null;
  subdistrict_id?: number | null;
  province_id?: number | null;
  city_id?: number | null;
  education_type_id?: number | null;
  education_major_id?: number | null;
  graduation_year?: string | null;
  education_npsn?: string | null;
  father_name?: string | null;
  father_status_id?: number | null;
  father_education_id?: number | null;
  father_occupation_id?: number | null;
  father_position?: string | null;
  father_salary_id?: number | null;
  mother_name?: string | null;
  mother_status_id?: number | null;
  mother_education_id?: number | null;
  mother_occupation_id?: number | null;
  mother_position?: string | null;
  mother_salary_id?: number | null;
  guardian_name?: string | null;
  guardian_status_id?: number | null;
  guardian_education_id?: number | null;
  guardian_occupation_id?: number | null;
  guardian_position?: string | null;
  guardian_salary_id?: number | null;
  guardian_province_id?: number | null;
  guardian_subdistrict_id?: number | null;
  guardian_city_id?: number | null;
  guardian_address?: string | null;
  parent_province_id?: number | null;
  parent_subdistrict_id?: number | null;
  parent_city_id?: number | null;
  parent_address?: string | null;
  scholarship_id?: number | null;
  disabilities_id?: number | null;
  faculty_id?: number | null;
  department_id?: number | null;
  academic_year?: string | null;
  salary_id?: number | null;
  occupation_id?: number | null;
  company_name?: string | null;
  company_address?: string | null;
  occupation_position?: string | null;
  utbk_pu?: number | null;
  utbk_kk?: number | null;
  utbk_ppu?: number | null;
  utbk_kmbm?: number | null;
  average_utbk?: number | null;
  average_grade?: number | null;
  registration_status_id?: number | null;
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
