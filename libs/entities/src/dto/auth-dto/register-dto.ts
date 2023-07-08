import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'dida@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
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

  @ApiProperty({
    example: 'Dida Dejan Golfantara',
  })
  @IsString()
  @IsNotEmpty()
  public fullname!: string;

  @ApiProperty({
    example: '41037006211190',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  public nik!: string;
}
