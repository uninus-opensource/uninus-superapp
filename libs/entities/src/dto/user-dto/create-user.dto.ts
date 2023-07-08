import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
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

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  public password!: string;
}
