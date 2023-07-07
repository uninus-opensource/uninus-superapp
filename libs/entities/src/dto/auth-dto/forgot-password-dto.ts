import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class forgotPasswordDto {
  @ApiProperty({
    example: 'dida123@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  public email!: string;
}
