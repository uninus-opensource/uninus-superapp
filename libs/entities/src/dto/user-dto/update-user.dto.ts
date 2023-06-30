import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  public email!: string;

  @IsOptional()
  @IsString()
  public nik!: string;

  @IsOptional()
  @IsString()
  public fullname!: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  public password!: string;

  @IsOptional()
  @IsNumber()
  public role_id!: number;

  @IsOptional()
  @IsString()
  public photo!: string;
}
