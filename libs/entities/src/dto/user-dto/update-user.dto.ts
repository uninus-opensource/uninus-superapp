import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
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

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
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
