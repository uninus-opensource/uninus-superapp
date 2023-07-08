import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class newPasswordDto {
  @ApiProperty({
    example: 'dida@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  public email!: string;

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
  public password!: string;
}
