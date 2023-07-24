import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import {
  EIdentificationType,
  EGender,
  EReligion,
  ECitizenship,
} from '@uninus/entities';

export class UpdateStudentDto {
  @ApiProperty()
  avatar!: string;

  @ApiProperty()
  nisn!: string;

  @ApiProperty()
  nik!: string;

  @ApiProperty()
  identification_type!: EIdentificationType;

  @ApiProperty()
  identification_number!: string;

  @ApiProperty()
  birth_place!: string;

  @ApiProperty()
  birth_date!: string;

  @ApiProperty()
  EGender!: EGender;

  @ApiProperty()
  EReligion!: EReligion;

  @ApiProperty()
  ECitizenship!: ECitizenship;

  @ApiProperty()
  marital_status!: string;

  @ApiProperty()
  country!: string;

  @ApiProperty()
  address!: string;

  @ApiProperty()
  rt!: string;

  @ApiProperty()
  rw!: string;

  @ApiProperty()
  postal_code!: string;

  @ApiProperty()
  subdistrict!: string;

  @ApiProperty()
  province!: string;

  @ApiProperty()
  city!: string;

  @ApiProperty()
  phone_number!: string;

  @ApiProperty()
  kk_number!: string;

  @ApiProperty()
  school_type!: string;

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
  graduation_year!: string;

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
  parent_phone_number!: string;

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
  guardian_city?: string;
}

export const UpdateStudentZodSchema = z.object({
  avatar: z.string(),
  nisn: z.string(),
  nik: z.string(),
  identification_type: z.nativeEnum(EIdentificationType),
  identification_number: z.string(),
  birth_place: z.string(),
  birth_date: z.string(),
  EGender: z.nativeEnum(EGender),
  EReligion: z.nativeEnum(EReligion),
  ECitizenship: z.nativeEnum(ECitizenship),
  marital_status: z.string(),
  country: z.string(),
  address: z.string(),
  rt: z.string(),
  rw: z.string(),
  postal_code: z.string(),
  subdistrict: z.string(),
  province: z.string(),
  city: z.string(),
  phone_number: z.string(),
  kk_number: z.string(),
  school_type: z.string(),
  school_major: z.string(),
  school_name: z.string(),
  school_npsm: z.string(),
  school_address: z.string(),
  school_postal_code: z.string(),
  school_subdistrict: z.string(),
  school_province: z.string(),
  school_city: z.string(),
  school_phone_number: z.string(),
  graduation_year: z.string(),
  father_name: z.string(),
  mother_name: z.string(),
  guardian_name: z.string(),
  father_status: z.string(),
  mother_status: z.string(),
  guardian_status: z.string(),
  parent_address: z.string(),
  parent_postal_code: z.string(),
  parent_subdistrict: z.string(),
  parent_province: z.string(),
  parent_city: z.string(),
  parent_phone_number: z.string(),
  father_education: z.string(),
  mother_education: z.string(),
  guardian_education: z.string().optional(),
  father_occupation: z.string(),
  mother_occupation: z.string(),
  guardian_occupation: z.string().optional(),
  father_income: z.string(),
  mother_income: z.string(),
  guardian_income: z.string().optional(),
  guardian_city: z.string().optional(),
});

export type TUpdateStudentSchema = z.infer<typeof UpdateStudentZodSchema>;
