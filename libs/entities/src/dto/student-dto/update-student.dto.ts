import { ApiProperty } from '@nestjs/swagger';
import {
  IsISO8601,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateStudentDto {
  @ApiProperty()
  @IsOptional()
  avatar!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nim!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nisn!: string;

  @ApiProperty({
    example: 'KTP | SIM | KARTU_PELAJAR',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['KTP', 'SIM', 'KARTU_PELAJAR'], {
    message: 'Card Type must be one of KTP, SIM atau KARTU_PELAJAR',
  })
  identification_type!: 'KTP' | 'SIM' | 'KARTU_PELAJAR';

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  identification_number!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  birth_place!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  birth_date!: string;

  @ApiProperty({
    example: 'MALE | FEMALE',
  })
  @IsNotEmpty()
  @IsIn(['MALE', 'FEMALE'], {
    message: 'Gender must be one MALE atau FEMALE',
  })
  gender!: 'MALE' | 'FEMALE';

  @ApiProperty({
    example: 'ISLAM | KRISTEN | KATOLIK | KONGHUCU | HINDU | BUDHA',
  })
  @IsNotEmpty()
  @IsIn(['ISLAM', 'KRISTEN', 'KATOLIK', 'KONGHUCU', 'HINDU', 'BUDHA'], {
    message:
      'Religion must be one of ISLAM, KRISTEN, KATOLIK, KONGHUCU, HINDU, BUDHA',
  })
  religion!: 'ISLAM' | 'KRISTEN' | 'KATOLIK' | 'KONGHUCU' | 'HINDU' | 'BUDHA';

  @ApiProperty({
    example: 'WNI | WNA',
  })
  @IsNotEmpty()
  @IsIn(['WNI', 'WNA'], {
    message: 'Citizenship must be one of WNI or WNA',
  })
  citizenship!: 'WNI' | 'WNA';

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  marital_status!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rt!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rw!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  postal_code!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  subdistrict!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  province!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone_number!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  kk_number!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  school_type!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  school_major!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  school_name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  school_address!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  school_postal_code!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  school_subdistrict!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  school_province!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  school_city!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  school_phone_number!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  graduation_year!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  father_name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mother_name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  guardian_name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  parent_address!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  parent_rt!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  parent_rw!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  parent_postal_code!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  parent_subdistrict!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  parent_province!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  parent_phone_number!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  father_education!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mother_education!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  guardian_education?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  father_occupation!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mother_occupation!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  guardian_occupation?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  father_income!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mother_income!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  guardian_income?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  selection_type!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  program!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  academic_year!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  registration_wave!: string;
}
