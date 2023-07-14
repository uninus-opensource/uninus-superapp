import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class newPasswordDto {
  @ApiProperty({
    example: '',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  public email!: string;

  @ApiProperty({
    example: 'min length 6, upper case 1, numbers 1',
  })
  @IsString()
  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    },
    { message: 'Password kurang dari 8 dan harus mengandung Kapital & Angka' }
  )
  public password!: string;
}
