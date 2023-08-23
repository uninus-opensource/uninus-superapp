import { TFIle } from "./file";
export interface IGetStudentRequest {
  id: string;
}

export interface IStudentData {
  email?: string | null;
  fullname?: string | null;
  first_deparment_id?: number | null;
  second_deparment_id?: number | null;
  selection_path_id?: number | null;
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
  father_position_id?: number | null;
  father_salary_id?: number | null;
  mother_name?: string | null;
  mother_status_id?: number | null;
  mother_education_id?: number | null;
  mother_occupation_id?: number | null;
  mother_position_id?: number | null;
  mother_salary_id?: number | null;
  guardian_name?: string | null;
  guardian_status_id?: number | null;
  guardian_education_id?: number | null;
  guardian_occupation_id?: number | null;
  guardian_position_id?: number | null;
  guardian_salary_id?: number | null;
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
  occupation_position_id?: number | null;
}

export interface IGetStudentResponse extends IStudentData {
  avatar: string | null;
}

export interface IDeleteStudentRequest extends IGetStudentRequest {
  id: string;
}

export interface IDeleteStudentResponse extends IStudentData {
  avatar: string | null;
}

export interface IUpdateStudentResponse extends IStudentData {
  avatar?: string | null | TFIle;
}
export interface IUpdateStudentRequest extends IGetStudentRequest, IStudentData {
  avatar: TFIle;
}

export interface IUpdateStudentRequestFE extends IStudentData {
  avatar?: TFIle | null;
}

export type TGraduationStatusRequest = {
  registration_number: string;
};

export interface IGetUserMeResponse extends IGetStudentRequest {
  registration_status: string | null;
  email: string | null;
  fullname: string | null;
  avatar: string | null;
}

export type TGraduationStatusReponse = {
  registration_number: string | null;
  fullname: string | null;
  registration_status: string | null;
  message?: string | null;
  birth_date: string | null;
  birth_place: string | null;
  city: string | null;
  school_name: string | null;
  province: string | null;
};
