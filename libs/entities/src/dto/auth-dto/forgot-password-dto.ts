import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
export class forgotPasswordDto {
  @ApiProperty({
    example: 'user@example.com',
  })
  public email!: string;
}

export const forgotPasswordZodSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Email tidak valid',
    })
    .nonempty({
      message: 'Email tidak boleh kosong',
    }),
});

export type TForgotPasswordSchema = z.infer<typeof forgotPasswordZodSchema>;
