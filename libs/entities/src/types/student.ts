import 'multer';
import { EGender, ECitizenship, EReligion } from '../enum';
export interface IGetStudentRequest {
  id: string;
}

export interface IStudentData {
  email: string;
  fullname: string;
  studentData?: {
    nik: string | null;
    nisn: string | null;
    birth_place: string | null;
    birth_date: string | null;
    gender: string;
    phone_number: string;
    religion: string | null;
    citizenship: string | null;
    marital_status: string | null;
    country: string | null;
    address: string | null;
    postal_code: string | null;
    subdistrict: string | null;
    province: string | null;
    city: string | null;
    school_type: string | null;
    graduation_year: string | null;
    school_major: string | null;
    school_name: string | null;
    school_npsn: string;
    school_address: string | null;
    school_postal_code: string | null;
    school_subdistrict: string | null;
    school_province: string | null;
    school_city: string | null;
    school_phone_number: string | null;
    father_name: string | null;
    mother_name: string | null;
    guardian_name: string | null;
    father_status: string | null;
    mother_status: string | null;
    guardian_status: string | null;
    parent_address: string | null;
    parent_postal_code: string | null;
    parent_subdistrict: string | null;
    parent_province: string | null;
    parent_city: string | null;
    father_education: string | null;
    mother_education: string | null;
    guardian_education: string | null;
    father_occupation: string | null;
    mother_occupation: string | null;
    guardian_occupation: string | null;
    father_income: string | null;
    mother_income: string | null;
    guardian_income: string | null;
    guardian_address: string | null;
    guardian_postal_code: string | null;
    guardian_subdistrict: string | null;
    guardian_province: string | null;
    guardian_city: string | null;
    faculty_type: string | null;
    education_programs: string | null;
    study_program: string | null;
    selection_type: string | null;
    family_card: string | null;
    pass_photo: string | null;
    ktp_card: string | null;
    school_report_card: string | null;
    birth_certificate: string | null;
    additional_documents: string | null;
    ijazah_card: string | null;
    kipk_card: string | null;
    academic_year: string | null;
    registration_wave: string | null;
    registration_status: string | null;
  };
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
export interface IUpdateStudentRequest extends IGetStudentRequest {
  avatar: Express.Multer.File;
  studentData: {
    email?: string;
    fullname?: string;
    nik?: string;
    nisn?: string;
    birth_place?: string;
    birth_date?: string;
    gender: EGender;
    phone_number?: string;
    religion: EReligion;
    citizenship: ECitizenship;
    marital_status?: string;
    country?: string;
    address?: string;
    postal_code?: string;
    subdistrict?: string;
    province?: string;
    city?: string;
    school_type?: string;
    graduation_year?: string;
    school_major?: string;
    school_name?: string;
    school_npsn?: string;
    school_address?: string;
    school_postal_code?: string;
    school_subdistrict?: string;
    school_province?: string;
    school_city?: string;
    school_phone_number?: string;
    father_name?: string;
    mother_name?: string;
    guardian_name?: string;
    father_status?: string;
    mother_status?: string;
    guardian_status?: string;
    parent_address?: string;
    parent_postal_code?: string;
    parent_subdistrict?: string;
    parent_province?: string;
    parent_city?: string;
    father_education?: string;
    mother_education?: string;
    guardian_education?: string;
    father_occupation?: string;
    mother_occupation?: string;
    guardian_occupation?: string;
    father_income?: string;
    mother_income?: string;
    guardian_income?: string;
    guardian_address?: string;
    guardian_postal_code?: string;
    guardian_subdistrict?: string;
    guardian_province?: string;
    guardian_city?: string;
    faculty_type?: string;
    education_programs?: string;
    study_program?: string;
    selection_type?: string;
    family_card?: string;
    pass_photo?: string;
    ktp_card?: string;
    school_report_card?: string;
    birth_certificate?: string;
    additional_documents?: string;
    ijazah_card?: string;
    kipk_card?: string;
    academic_year?: string;
    registration_wave?: string;
    registration_status?: string;
  };
}
