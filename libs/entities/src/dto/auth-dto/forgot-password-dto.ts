import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class forgotPasswordDto {
  @ApiProperty({
    example: '',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  public email!: string;
}
