import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class newPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  public email!: string;

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
  public password!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(6)
  public otp!: string;
}
