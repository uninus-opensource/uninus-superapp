import { EGender, ECitizenship, EReligion } from "../enum";
import { EOccupation } from "../enum/job";
import { TFIle } from "./file";
export interface IGetStudentRequest {
  id: string;
}

export interface IStudentData {
  email: string;
  fullname: string;
  nik?: string | null;
  nisn?: string | null;
  birth_place?: string | null;
  birth_date?: string | null;
  gender_id?: number | null;
  phone_number?: string | null;
  citizenship_id?: number | null;
  marital_status_id?: number | null;
  country_id?: number | null;
  address?: string | null;
  postal_code?: string | null;
  subdistrict_id?: number | null;
  province_id?: number | null;
  city_id?: number | null;
  school_type_id?: number | null;
  graduation_year?: string | null;
  school_major?: string | null;
  education_history_id?: number | null;
  father_name?: string | null;
  mother_name?: string | null;
  guardian_name?: string | null;
  father_status_id?: number | null;
  mother_status_id?: number | null;
  guardian_status?: string | null;
  parent_address?: string | null;
  parent_postal_code?: string | null;
  parent_subdistrict?: string | null;
  parent_province?: string | null;
  parent_city?: string | null;
  father_education?: string | null;
  mother_education?: string | null;
  guardian_education?: string | null;
  father_occupation?: EOccupation;
  father_occupation_position?: string | null;
  mother_occupation?: EOccupation;
  mother_occupation_position?: string | null;
  guardian_occupation?: EOccupation;
  guardian_occupation_position?: string | null;
  father_income?: string | null;
  mother_income?: string | null;
  guardian_income?: string | null;
  guardian_address?: string | null;
  guardian_postal_code?: string | null;
  guardian_subdistrict?: string | null;
  guardian_province?: string | null;
  guardian_city?: string | null;
  faculty_type?: string | null;
  education_programs?: string | null;
  first_study_program?: string | null;
  number_study_program?: string | null;
  selection_type?: string | null;
  family_card?: string | null;
  family_card_number?: string | null;
  pass_photo?: string | null;
  ktp_card?: string | null;
  school_report_card_id?: number | null;
  utbk_certificate?: string | null;
  utbk_grade?: number | null;
  birth_certificate?: string | null;
  additional_documents_id?: number | null;
  disabilities_id?: number | null;
  ijazah_card?: string | null;
  math_grade_id?: number | null;
  indonesian_language_grade_id?: number | null;
  english_language_grade_id?: number | null;
  scholarship_id?: number | null;
  academic_year?: string | null;
  registration_wave?: string | null;
  registration_status?: string | null;
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
  avatar: string | null;
}
export interface IUpdateStudentRequest extends IGetStudentRequest, IStudentData {
  avatar: TFIle;
}

export type TGraduationStatusRequest = {
  registration_number: string;
};

export type TGraduationStatusReponse = {
  registration_number: string | null;
  fullname: string | null;
  birth_date: string | null;
  birth_place: string | null;
  registration_status: string | null;
};
