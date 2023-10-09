import { ApiProperty } from "@nestjs/swagger";

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
  occupation_position_id!: number;

  @ApiProperty()
  salary_id!: number;

  @ApiProperty()
  father_name!: string;

  @ApiProperty()
  father_status_id!: number;

  @ApiProperty()
  father_education_id!: number;

  @ApiProperty()
  father_occupation_id!: number;

  @ApiProperty()
  father_position_id!: number;

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
  mother_position_id!: number;

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
  guardian_position_id!: number;

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
  first_deparment_id!: number;

  @ApiProperty()
  second_deparment_id!: number;

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
}
