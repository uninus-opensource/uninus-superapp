import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  nim!: string;

  @IsString()
  @IsOptional()
  nisn!: string;

  @IsNotEmpty()
  identification_type!: 'KTP' | 'SIM' | 'Kartu_Pelajar';

  @IsNotEmpty()
  @IsString()
  identification_number!: string;

  @IsNotEmpty()
  @IsString()
  birth_place!: string;

  @IsNotEmpty()
  @IsDateString()
  birth_date!: string;

  @IsNotEmpty()
  gender!: 'Male' | 'Female';

  @IsNotEmpty()
  religion!: 'Islam' | 'Kristen' | 'Katholik' | 'Konghucu' | 'Hindu' | 'Budha';

  @IsNotEmpty()
  citizenship!: 'WNI' | 'WNA';

  @IsNotEmpty()
  @IsString()
  marital_status!: string;

  @IsNotEmpty()
  @IsString()
  country!: string;

  @IsNotEmpty()
  @IsString()
  address!: string;

  @IsNotEmpty()
  @IsString()
  rt!: string;

  @IsNotEmpty()
  @IsString()
  rw!: string;

  @IsNotEmpty()
  @IsString()
  postal_code!: string;

  @IsNotEmpty()
  @IsString()
  subdistrict!: string;

  @IsNotEmpty()
  @IsString()
  province!: string;

  @IsNotEmpty()
  @IsString()
  city!: string;

  @IsNotEmpty()
  @IsString()
  phone_number!: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsNotEmpty()
  @IsString()
  kk_number!: string;

  @IsNotEmpty()
  @IsString()
  school_type!: string;

  @IsNotEmpty()
  @IsString()
  school_major!: string;

  @IsNotEmpty()
  @IsString()
  school_name!: string;

  @IsNotEmpty()
  @IsString()
  school_address!: string;

  @IsNotEmpty()
  @IsString()
  school_postal_code!: string;

  @IsNotEmpty()
  @IsString()
  school_subdistrict!: string;

  @IsNotEmpty()
  @IsString()
  school_province!: string;

  @IsNotEmpty()
  @IsString()
  school_city!: string;

  @IsNotEmpty()
  @IsString()
  school_phone_number!: string;

  @IsNotEmpty()
  @IsString()
  graduation_year!: string;

  @IsNotEmpty()
  @IsString()
  father_name!: string;

  @IsNotEmpty()
  @IsString()
  mother_name!: string;

  @IsNotEmpty()
  @IsString()
  guardian_name!: string;

  @IsNotEmpty()
  @IsString()
  parent_address!: string;

  @IsNotEmpty()
  @IsString()
  parent_rt!: string;

  @IsNotEmpty()
  @IsString()
  parent_rw!: string;

  @IsNotEmpty()
  @IsString()
  parent_postal_code!: string;

  @IsNotEmpty()
  @IsString()
  parent_subdistrict!: string;

  @IsNotEmpty()
  @IsString()
  parent_province!: string;

  @IsNotEmpty()
  @IsString()
  parent_phone_number!: string;

  @IsNotEmpty()
  @IsString()
  father_education!: string;

  @IsNotEmpty()
  @IsString()
  mother_education!: string;

  @IsOptional()
  @IsString()
  guardian_education?: string;

  @IsNotEmpty()
  @IsString()
  father_occupation!: string;

  @IsNotEmpty()
  @IsString()
  mother_occupation!: string;

  @IsOptional()
  @IsString()
  guardian_occupation?: string;

  @IsNotEmpty()
  @IsString()
  father_income!: string;

  @IsNotEmpty()
  @IsString()
  mother_income!: string;

  @IsOptional()
  @IsString()
  guardian_income?: string;

  @IsNotEmpty()
  @IsString()
  selection_type!: string;

  @IsNotEmpty()
  @IsString()
  program!: string;

  @IsNotEmpty()
  @IsString()
  academic_year!: string;

  @IsNotEmpty()
  @IsString()
  registration_wave!: string;

  @IsNotEmpty()
  @IsString()
  user_id!: string;
}
