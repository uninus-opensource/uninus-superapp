import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({
    example: '2fc66b45-e6f6-48c7-89f1-b62d0a398cfc',
  })
  @IsString()
  public sub!: string;
}

export class LogoutDto {
  user!: UserDto;
}
