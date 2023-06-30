import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  nim!: string;

  @IsOptional()
  @IsString()
  nisn!: string;

  @IsOptional()
  identification_type!: 'KTP' | 'SIM' | 'KARTU_PELAJAR';

  @IsOptional()
  @IsString()
  identification_number!: string;

  @IsOptional()
  @IsString()
  birth_place!: string;

  @IsOptional()
  @IsString()
  birth_date!: string;

  @IsOptional()
  gender!: 'Male' | 'Female';

  @IsOptional()
  religion!: 'Islam' | 'Kristen' | 'Katholik' | 'Konghucu' | 'Hindu' | 'Budha';

  @IsOptional()
  citizenship!: 'WNI' | 'WNA';

  @IsOptional()
  @IsString()
  marital_status!: string;

  @IsOptional()
  @IsString()
  country!: string;

  @IsOptional()
  @IsString()
  address!: string;

  @IsOptional()
  @IsString()
  rt!: string;

  @IsOptional()
  @IsString()
  rw!: string;

  @IsOptional()
  @IsString()
  postal_code!: string;

  @IsOptional()
  @IsString()
  subdistrict!: string;

  @IsOptional()
  @IsString()
  province!: string;

  @IsOptional()
  @IsString()
  city!: string;

  @IsOptional()
  @IsString()
  phone_number!: string;

  @IsOptional()
  @IsString()
  photo!: string;

  @IsOptional()
  @IsString()
  kk_number!: string;

  @IsOptional()
  @IsString()
  school_type!: string;

  @IsOptional()
  @IsString()
  school_major!: string;

  @IsOptional()
  @IsString()
  school_name!: string;

  @IsOptional()
  @IsString()
  school_address!: string;

  @IsOptional()
  @IsString()
  school_postal_code!: string;

  @IsOptional()
  @IsString()
  school_subdistrict!: string;

  @IsOptional()
  @IsString()
  school_province!: string;

  @IsOptional()
  @IsString()
  school_city!: string;

  @IsOptional()
  @IsString()
  school_phone_number!: string;

  @IsOptional()
  @IsString()
  graduation_year!: string;

  @IsOptional()
  @IsString()
  father_name!: string;

  @IsOptional()
  @IsString()
  mother_name!: string;

  @IsOptional()
  @IsString()
  guardian_name!: string;

  @IsOptional()
  @IsString()
  parent_address!: string;

  @IsOptional()
  @IsString()
  parent_rt!: string;

  @IsOptional()
  @IsString()
  parent_rw!: string;

  @IsOptional()
  @IsString()
  parent_postal_code!: string;

  @IsOptional()
  @IsString()
  parent_subdistrict!: string;

  @IsOptional()
  @IsString()
  parent_province!: string;

  @IsOptional()
  @IsString()
  parent_phone_number!: string;

  @IsOptional()
  @IsString()
  father_education!: string;

  @IsOptional()
  @IsString()
  mother_education!: string;

  @IsOptional()
  @IsString()
  guardian_education!: string;

  @IsOptional()
  @IsString()
  father_occupation!: string;

  @IsOptional()
  @IsString()
  mother_occupation!: string;

  @IsOptional()
  @IsString()
  guardian_occupation!: string;

  @IsOptional()
  @IsString()
  father_income!: string;

  @IsOptional()
  @IsString()
  mother_income!: string;

  @IsOptional()
  @IsString()
  guardian_income!: string;

  @IsOptional()
  @IsString()
  selection_type!: string;

  @IsOptional()
  @IsString()
  program!: string;

  @IsOptional()
  @IsString()
  academic_year!: string;

  @IsOptional()
  @IsString()
  registration_wave!: string;
}
