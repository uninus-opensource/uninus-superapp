import { ApiProperty } from "@nestjs/swagger";
import { EGender, ECitizenship, EReligion, EOccupation } from "@uninus/entities";

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

  @ApiProperty({
    example: Object.keys(EGender),
    description: "string",
  })
  gender!: EGender;

  @ApiProperty()
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
  education_history_id?: number | null;

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
  father_occupation?: EOccupation;

  @ApiProperty()
  father_occupation_position?: string;

  @ApiProperty()
  mother_occupation?: EOccupation;

  @ApiProperty()
  mother_occupation_position?: string;

  @ApiProperty()
  guardian_occupation?: EOccupation;

  @ApiProperty()
  guardian_occupation_position?: string;

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
