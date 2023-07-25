import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import {
  EIdentificationType,
  EGender,
  EReligion,
  ECitizenship,
} from '../../enum';

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
  avatar: z.string().optional(),
  nisn: z.string().optional(),
  nik: z.string().optional(),
  identification_type: z.nativeEnum(EIdentificationType).optional(),
  identification_number: z.string().optional(),
  birth_place: z.string().optional(),
  birth_date: z.string().optional(),
  EGender: z.nativeEnum(EGender).optional(),
  EReligion: z.nativeEnum(EReligion).optional(),
  ECitizenship: z.nativeEnum(ECitizenship).optional(),
  marital_status: z.string().optional(),
  country: z.string().optional(),
  address: z.string().optional(),
  rt: z.string().optional(),
  rw: z.string().optional(),
  postal_code: z.string().optional(),
  subdistrict: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional(),
  phone_number: z.string().optional(),
  kk_number: z.string().optional(),
  school_type: z.string().optional(),
  school_major: z.string().optional(),
  school_name: z.string().optional(),
  school_npsm: z.string().optional(),
  school_address: z.string().optional(),
  school_postal_code: z.string().optional(),
  school_subdistrict: z.string().optional(),
  school_province: z.string().optional(),
  school_city: z.string().optional(),
  school_phone_number: z.string().optional(),
  graduation_year: z.string().optional(),
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
  parent_phone_number: z.string().optional(),
  father_education: z.string().optional(),
  mother_education: z.string().optional(),
  guardian_education: z.string().optional(),
  father_occupation: z.string().optional(),
  mother_occupation: z.string().optional(),
  guardian_occupation: z.string().optional(),
  father_income: z.string().optional(),
  mother_income: z.string().optional(),
  guardian_income: z.string().optional(),
  guardian_city: z.string().optional(),
});

export type TUpdateStudentSchema = z.infer<typeof UpdateStudentZodSchema>;
