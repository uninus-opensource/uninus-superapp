import { ApiProperty } from '@nestjs/swagger';
import {
  IsISO8601,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateStudentDto {
  @ApiProperty()
  @IsOptional()
  avatar!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  nim!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  nisn!: string;

  @ApiProperty({
    example: 'KTP | SIM | KARTU_PELAJAR',
    description: 'string',
  })
  @IsOptional()
  @IsString()
  @IsIn(['KTP', 'SIM', 'KARTU_PELAJAR'], {
    message: 'Card Type must be one of KTP, SIM atau KARTU_PELAJAR',
  })
  identification_type!: 'KTP' | 'SIM' | 'KARTU_PELAJAR';

  @ApiProperty()
  @IsOptional()
  @IsString()
  identification_number!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  birth_place!: string;

  @ApiProperty()
  @IsOptional()
  @IsISO8601()
  birth_date!: string;

  @ApiProperty({
    example: 'MALE | FEMALE',
  })
  @IsOptional()
  @IsIn(['MALE', 'FEMALE'], {
    message: 'Gender must be one MALE atau FEMALE',
  })
  gender!: 'MALE' | 'FEMALE';

  @ApiProperty({
    example: 'ISLAM | KRISTEN | KATOLIK | KONGHUCU | HINDU | BUDHA',
  })
  @IsOptional()
  @IsIn(['ISLAM', 'KRISTEN', 'KATOLIK', 'KONGHUCU', 'HINDU', 'BUDHA'], {
    message:
      'Religion must be one of ISLAM, KRISTEN, KATOLIK, KONGHUCU, HINDU, BUDHA',
  })
  religion!: 'ISLAM' | 'KRISTEN' | 'KATOLIK' | 'KONGHUCU' | 'HINDU' | 'BUDHA';

  @ApiProperty({
    example: 'WNI | WNA',
  })
  @IsOptional()
  @IsIn(['WNI', 'WNA'], {
    message: 'Citizenship must be one of WNI or WNA',
  })
  citizenship!: 'WNI' | 'WNA';

  @ApiProperty()
  @IsOptional()
  @IsString()
  marital_status!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  country!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  rt!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  rw!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  postal_code!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  subdistrict!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  province!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  city!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone_number!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  kk_number!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  school_type!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  school_major!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  school_name!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  school_address!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  school_postal_code!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  school_subdistrict!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  school_province!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  school_city!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  school_phone_number!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  graduation_year!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  father_name!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  mother_name!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  guardian_name!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  parent_address!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  parent_rt!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  parent_rw!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  parent_postal_code!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  parent_subdistrict!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  parent_province!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  parent_phone_number!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  father_education!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  mother_education!: string;

  @ApiProperty({
    description: 'Optional',
  })
  @IsOptional()
  @IsString()
  guardian_education?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  father_occupation!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  mother_occupation!: string;

  @ApiProperty({
    description: 'Optional',
  })
  @IsOptional()
  @IsString()
  guardian_occupation?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  father_income!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  mother_income!: string;

  @ApiProperty({
    description: 'Optional',
  })
  @IsOptional()
  @IsString()
  guardian_income?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  selection_type!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  program!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  academic_year!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  registration_wave!: string;
}
