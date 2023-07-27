import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class resendOtpSchema {
  @ApiProperty({
    example: '',
  })
  public email!: string;
}

export const resendOtpZodSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Email tidak valid',
    })
    .nonempty({
      message: 'Email tidak boleh kosong',
    }),
});

export type TResendOtpSchema = z.infer<typeof resendOtpZodSchema>;
