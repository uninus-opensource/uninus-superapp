import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import {
  EIdentificationType,
  EGender,
  EReligion,
  ECitizenship,
} from '../../enum';

export class UpdateStudentSchema {
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
    description: 'string',
  })
  gender!: EGender;

  @ApiProperty()
  phone_number!: string;

  @ApiProperty({
    example: Object.keys(EReligion),
    description: 'string',
  })
  religion!: EReligion;

  @ApiProperty({
    example: Object.keys(ECitizenship),
    description: 'string',
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

export const UpdateStudentZodSchema = z.object({
  nik: z.string().optional(),
  nisn: z.string().optional(),
  birth_place: z.string().optional(),
  birth_date: z.string().optional(),
  gender: z.nativeEnum(EGender).optional(),
  phone_number: z.string().optional(),
  religion: z.nativeEnum(EReligion).optional(),
  citizenship: z.nativeEnum(ECitizenship).optional(),
  marital_status: z.string().optional(),
  country: z.string().optional(),
  address: z.string().optional(),
  postal_code: z.string().optional(),
  subdistrict: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional(),
  school_type: z.string().optional(),
  graduation_year: z.string().optional(),
  school_major: z.string().optional(),
  school_name: z.string().optional(),
  school_npsm: z.string().optional(),
  school_address: z.string().optional(),
  school_postal_code: z.string().optional(),
  school_subdistrict: z.string().optional(),
  school_province: z.string().optional(),
  school_city: z.string().optional(),
  school_phone_number: z.string().optional(),
  father_name: z.string().optional(),
  mother_name: z.string().optional(),
  guardian_name: z.string().optional(),
  father_status: z.string().optional(),
  mother_status: z.string().optional(),
  guardian_status: z.string().optional(),
  parent_address: z.string().optional(),
  parent_postal_code: z.string().optional(),
  parent_subdistrict: z.string().optional(),
  parent_province: z.string().optional(),
  parent_city: z.string().optional(),
  father_education: z.string().optional(),
  mother_education: z.string().optional(),
  guardian_education: z.string().optional(),
  father_occupation: z.string().optional(),
  mother_occupation: z.string().optional(),
  guardian_occupation: z.string().optional(),
  father_income: z.string().optional(),
  mother_income: z.string().optional(),
  guardian_income: z.string().optional(),
  guardian_address: z.string().optional(),
  guardian_postal_code: z.string().optional(),
  guardian_subdistrict: z.string().optional(),
  guardian_province: z.string().optional(),
  guardian_city: z.string().optional(),
  faculty_type: z.string().optional(),
  education_programs: z.string().optional(),
  study_program: z.string().optional(),
  selection_type: z.string().optional(),
  family_card: z.string().optional(),
  pass_photo: z.string().optional(),
  ktp_card: z.string().optional(),
  school_report_card: z.string().optional(),
  birth_certificate: z.string().optional(),
  additional_documents: z.string().optional(),
  ijazah_card: z.string().optional(),
  kipk_card: z.string().optional(),
  academic_year: z.string().optional(),
  registration_wave: z.string().optional(),
  registration_status: z.string().optional(),
});

export type TUpdateStudentSchema = z.infer<typeof UpdateStudentZodSchema>;
