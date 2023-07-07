import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'Dida123@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  public email!: string;

  @ApiProperty({
    example: 'Didadejan123',
  })
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  public password!: string;
}
