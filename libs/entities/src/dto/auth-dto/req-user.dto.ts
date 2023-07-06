import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class ReqUserDto {
  @ApiProperty({
    example: 'dida123@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  public email!: string;

  @ApiProperty({
    example: 'Didadejan123',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 20, {
    message: 'password has to be at between 3 and 20 characters',
  })
  @ApiProperty({
    example: '41037006280',
  })
  public nik!: string;
}
