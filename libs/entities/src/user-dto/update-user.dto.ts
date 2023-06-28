import {
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsEmail()
  public email!: string;

  @IsString()
  public nik!: string;

  @IsString()
  public fullname!: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  public password!: string;

  @IsNumber()
  public role_id!: number;

  @IsString()
  public photo!: string;
}
