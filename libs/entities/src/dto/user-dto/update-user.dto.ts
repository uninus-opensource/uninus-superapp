import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEmail()
  public email!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public nik!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public fullname!: string;

  @ApiProperty({
    example: 'min length 6, upper case 1, numbers 1',
  })
  @IsOptional()
  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  public password!: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public role_id!: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public photo!: string;
}
