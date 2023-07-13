import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public nik!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public fullname!: string;

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
}
