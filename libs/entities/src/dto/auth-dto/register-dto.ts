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
    example: '',
  })
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @ApiProperty({
    example: 'min length 6, upper case 1, numbers 1',
  })
  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  public password!: string;

  @ApiProperty({
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  public fullname!: string;

  @ApiProperty({
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  public nik!: string;
}
