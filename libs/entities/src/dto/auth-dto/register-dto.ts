import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'dida@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    example: 'Didadejan123',
  })
  @IsString()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    },
    { message: 'Password kurang dari 8 dan harus mengandung Kapital & Angka' }
  )
  public password: string;

  @ApiProperty({
    example: 'Dida Dejan Golfantara',
  })
  @IsString()
  @IsNotEmpty()
  public fullname: string;

  @ApiProperty({
    example: '41037006211190',
  })
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
