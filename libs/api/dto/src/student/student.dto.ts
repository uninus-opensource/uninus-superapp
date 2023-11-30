import { ApiProperty } from "@nestjs/swagger";
import { EGender, ECitizenship, EReligion } from "@uninus/entities";
export class UpdateStudentDto {
  @ApiProperty()
  avatar!: string;

  @ApiProperty()
  fullname!: string;

  @ApiProperty()
  nik!: string;

  @ApiProperty()
  nisn!: string;

  @ApiProperty()
  no_kk!: string;

  @ApiProperty()
  gender_id!: number;

  @ApiProperty()
  relogion_id!: number;

  @ApiProperty()
  birth_place!: string;

  @ApiProperty()
  birth_date!: string;

  @ApiProperty()
  phone_number!: string;

  @ApiProperty()
  citizenship_id!: number;

  @ApiProperty()
  marital_status_id!: number;

  @ApiProperty()
  country_id!: number;

  @ApiProperty()
  address!: string;

  @ApiProperty()
  subdistrict_id!: number;

  @ApiProperty()
  province_id!: number;

  @ApiProperty()
  city_id!: number;

  @ApiProperty()
  education_type_id!: number;

  @ApiProperty()
  education_major_id!: number;

  @ApiProperty()
  graduation_year!: string;

  @ApiProperty()
  education_npsn!: string;

  @ApiProperty()
  company_name!: string;

  @ApiProperty()
  company_address!: string;

  @ApiProperty()
  occupation_id!: number;

  @ApiProperty()
  occupation_position!: string;

  @ApiProperty()
  salary_id!: number;

  @ApiProperty()
  guardian_lecturer_id!: string;

  @ApiProperty()
  father_name!: string;

  @ApiProperty()
  father_status_id!: number;

  @ApiProperty()
  father_education_id!: number;

  @ApiProperty()
  father_occupation_id!: number;

  @ApiProperty()
  father_position!: string;

  @ApiProperty()
  father_salary_id!: number;

  @ApiProperty()
  mother_name!: string;

  @ApiProperty()
  mother_status_id!: number;

  @ApiProperty()
  mother_education_id!: number;

  @ApiProperty()
  mother_occupation_id!: number;

  @ApiProperty()
  mother_position!: string;

  @ApiProperty()
  mother_salary_id!: number;

  @ApiProperty()
  guardian_name!: string;

  @ApiProperty()
  guardian_status_id!: number;

  @ApiProperty()
  guardian_education_id!: number;

  @ApiProperty()
  guardian_occupation_id!: number;

  @ApiProperty()
  guardian_position!: string;

  @ApiProperty()
  guardian_salary_id!: number;

  @ApiProperty()
  parent_province!: number;

  @ApiProperty()
  parent_subdistrict_id!: number;

  @ApiProperty()
  parent_city_id!: number;

  @ApiProperty()
  parent_address!: string;

  @ApiProperty()
  scholarship_id!: number;

  @ApiProperty()
  disabilities_id!: number;

  @ApiProperty()
  faculty_id!: number;

  @ApiProperty()
  department_id!: number;

  @ApiProperty()
  academic_year!: string;

  @ApiProperty()
  degree_program_id!: number;

  @ApiProperty()
  first_department_id!: number;

  @ApiProperty()
  second_department_id!: number;

  @ApiProperty()
  selection_path_id!: number;

  @ApiProperty()
  registration_path_id!: number;

  @ApiProperty()
  average_utbk!: number;

  @ApiProperty()
  utbk_pu!: number;

  @ApiProperty()
  utbk_kk!: number;

  @ApiProperty()
  utbk_ppu!: number;

  @ApiProperty()
  utbk_kmbm!: number;

  @ApiProperty({
    example: {
      name: "kk",
      path: "https://uninus.s3.ap-southeast-1.amazonaws.com/169393489551WhatsAp-Image-2023-08-31-a-20.10.31.jpeg",
    },
  })
  document!: object;

  @ApiProperty({
    isArray: true,
    example: [
      {
        name: "kk",
        path: "https://uninus.s3.ap-southeast-1.amazonaws.com/169393489551WhatsAp-Image-2023-08-31-a-20.10.31.jpeg",
      },
      {
        id: "04422755-dafb-46e1-aeeb-1aec363c9af2",
        isVerified: true,
      },
    ],
  })
  documents!: [];

  @ApiProperty({
    isArray: true,
    example: [
      {
        subject: "matematika",
        semester: "1",
        grade: 90,
      },
    ],
  })
  student_grade!: [];

  @ApiProperty()
  registration_status_id!: number;
}

export class CreateStudentDto {
  @ApiProperty()
  email!: string;

  @ApiProperty()
  fullname!: string;

  @ApiProperty()
  nik!: string;

  @ApiProperty()
  nisn!: string;

  @ApiProperty()
  birth_place!: string;

  @ApiProperty()
  birth_date!: string;

  @ApiProperty({
    example: Object.keys(EGender),
    description: "string",
  })
  gender!: EGender;

  @ApiProperty({
    example: "082212341234",
  })
  phone_number!: string;

  @ApiProperty({
    example: Object.keys(EReligion),
    description: "string",
  })
  religion!: EReligion;

  @ApiProperty({
    example: Object.keys(ECitizenship),
    description: "string",
  })
  citizenship!: ECitizenship;

  @ApiProperty()
  marital_status!: string;

  @ApiProperty()
  country!: string;

  @ApiProperty()
  address!: string;

  @ApiProperty()
  postal_code!: string;

  @ApiProperty()
  subdistrict!: string;

  @ApiProperty()
  province!: string;

  @ApiProperty()
  city!: string;

  @ApiProperty()
  school_type!: string;

  @ApiProperty()
  graduation_year!: string;

  @ApiProperty()
  school_major!: string;

  @ApiProperty()
  school_name!: string;

  @ApiProperty()
  school_npsm!: string;

  @ApiProperty()
  school_address!: string;

  @ApiProperty()
  school_postal_code!: string;

  @ApiProperty()
  school_subdistrict!: string;

  @ApiProperty()
  school_province!: string;

  @ApiProperty()
  school_city!: string;

  @ApiProperty()
  school_phone_number!: string;

  @ApiProperty()
  father_name!: string;

  @ApiProperty()
  mother_name!: string;

  @ApiProperty()
  guardian_name!: string;

  @ApiProperty()
  father_status!: string;

  @ApiProperty()
  mother_status!: string;

  @ApiProperty()
  guardian_status!: string;

  @ApiProperty()
  parent_address!: string;

  @ApiProperty()
  parent_postal_code!: string;

  @ApiProperty()
  parent_subdistrict!: string;

  @ApiProperty()
  parent_province!: string;

  @ApiProperty()
  parent_city!: string;

  @ApiProperty()
  father_education!: string;

  @ApiProperty()
  mother_education!: string;

  @ApiProperty()
  guardian_education?: string;

  @ApiProperty()
  father_occupation!: string;

  @ApiProperty()
  mother_occupation!: string;

  @ApiProperty()
  guardian_occupation?: string;

  @ApiProperty()
  father_income!: string;

  @ApiProperty()
  mother_income!: string;

  @ApiProperty()
  guardian_income?: string;

  @ApiProperty()
  guardian_address?: string;

  @ApiProperty()
  guardian_postal_code?: string;

  @ApiProperty()
  guardian_subdistrict?: string;

  @ApiProperty()
  guardian_province?: string;

  @ApiProperty()
  guardian_city?: string;

  @ApiProperty()
  faculty_type?: string;

  @ApiProperty()
  education_programs?: string;

  @ApiProperty()
  study_program?: string;

  @ApiProperty()
  selection_type?: string;

  @ApiProperty()
  family_card?: string;

  @ApiProperty()
  pass_photo?: string;

  @ApiProperty()
  ktp_card?: string;

  @ApiProperty()
  school_report_card?: string;

  @ApiProperty()
  birth_certificate?: string;

  @ApiProperty()
  additional_documents?: string;

  @ApiProperty()
  ijazah_card?: string;

  @ApiProperty()
  kipk_card?: string;

  @ApiProperty()
  academic_year?: string;

  @ApiProperty()
  registration_wave?: string;

  @ApiProperty()
  registration_status?: string;
}
