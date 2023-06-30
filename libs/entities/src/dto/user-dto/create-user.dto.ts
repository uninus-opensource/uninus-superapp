import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @IsString()
  @IsNotEmpty()
  public nik!: string;

  @IsString()
  @IsNotEmpty()
  public fullname!: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  public password!: string;
}
