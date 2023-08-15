import { ApiProperty } from "@nestjs/swagger";

export class UpdateStudentSwagger {
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

  @ApiProperty()
  gender_id!: number;

  @ApiProperty()
  phone_number!: string;

  @ApiProperty()
  religion_id!: number;

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
  education_npsn!: string;

  @ApiProperty()
  father_name!: string;

  @ApiProperty()
  mother_name!: string;

  @ApiProperty()
  guardian_name!: string;

  @ApiProperty()
  father_status_id!: string;

  @ApiProperty()
  mother_status_id!: string;

  @ApiProperty()
  guardian_status_id!: string;

  @ApiProperty()
  parent_address!: string;

  @ApiProperty()
  parent_subdistrict_id!: number;

  @ApiProperty()
  parent_province_id!: number;

  @ApiProperty()
  parent_city_id!: number;

  @ApiProperty()
  father_education_id!: number;

  @ApiProperty()
  mother_education_id!: number;

  @ApiProperty()
  guardian_education_id!: number;

  @ApiProperty()
  father_occupation_id!: number;

  @ApiProperty()
  father_occupation_position_id!: number;

  @ApiProperty()
  mother_occupation_id!: number;

  @ApiProperty()
  mother_occupation_position_id!: number;

  @ApiProperty()
  guardian_occupation_id!: number;

  @ApiProperty()
  guardian_occupation_position_id!: number;

  @ApiProperty()
  father_salary_id!: number;

  @ApiProperty()
  mother_salary_id!: number;

  @ApiProperty()
  guardian_salary_id!: number;

  @ApiProperty()
  guardian_subdistrict_id!: number;

  @ApiProperty()
  guardian_province_id!: number;

  @ApiProperty()
  guardian_city_id!: number;

  @ApiProperty()
  academic_year!: string;
}
