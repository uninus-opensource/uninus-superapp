import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsEnum, IsOptional, IsString } from 'class-validator';
import {
  EIdentificationType,
  EGender,
  EReligion,
  ECitizenship,
} from '../../enum';

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
    example: Object.keys(EIdentificationType),
    description: 'string',
  })
  @IsOptional()
  @IsString()
  @IsEnum(EIdentificationType, { each: true })
  identification_type!: EIdentificationType;

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
    example: Object.keys(EGender),
    description: 'string',
  })
  @IsOptional()
  @IsString()
  @IsEnum(EGender, { each: true })
  EGender!: EGender;

  @ApiProperty({
    example: Object.keys(EReligion),
    description: 'string',
  })
  @IsOptional()
  @IsString()
  @IsEnum(EReligion, { each: true })
  EReligion!: EReligion;

  @ApiProperty({
    example: Object.keys(ECitizenship),
    description: 'string',
  })
  @IsOptional()
  @IsString()
  @IsEnum(ECitizenship, { each: true })
  ECitizenship!: ECitizenship;

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

  @ApiProperty()
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

  @ApiProperty()
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

  @ApiProperty()
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
