import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class resendOtpDto {
  @ApiProperty({
    example: '',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  public email!: string;
}
