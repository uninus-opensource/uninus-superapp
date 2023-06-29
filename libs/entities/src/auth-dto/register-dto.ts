import { IsNotEmpty, IsString, IsEmail, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  }, {message : 'Password kurang dari 8 dan harus mengandung Kapital & Angka'})
  public password: string;

  @IsString()
  @IsNotEmpty()
  public fullname: string;

  @IsString()
  @IsNotEmpty()
  public nik: string;

  constructor(email: string, password: string, fullname: string, nik: string) {
    this.email = email;
    this.password = password;
    this.fullname = fullname;
    this.nik = nik;
  }
}
