import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  public email!: string;

  @IsNotEmpty()
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
  public newPassword!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  public confirmPassword!: string;
}
