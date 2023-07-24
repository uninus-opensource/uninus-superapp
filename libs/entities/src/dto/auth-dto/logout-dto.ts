import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import { IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({
    example: '2fc66b45-e6f6-48c7-89f1-b62d0a398cfc',
  })
  @IsString()
  public sub!: string;
}

export class LogoutDto {
  @ApiProperty()
  public refresh_token!: string;
}

export const UserDtoZodSchema = z.object({
  sub: z.string(),
});

export const LogoutZodSchema = z.object({
  refresh_token: z.string(),
});

export type TUserDtoSchema = z.infer<typeof UserDtoZodSchema>;
export type TLogoutSchema = z.infer<typeof LogoutZodSchema>;
