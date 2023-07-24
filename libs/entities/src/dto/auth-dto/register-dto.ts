import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsOptional,
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
  @IsNotEmpty()
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

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public phone_number!: string;

  @ApiProperty()
  @IsOptional()
  public role_id!: number;
}
