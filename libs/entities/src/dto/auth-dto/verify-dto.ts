import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class verifyOtpDto {
  @ApiProperty({
    example: '',
  })
  public email!: string;

  @ApiProperty({
    example: 'length 6',
  })
  public otp!: string;
}

export const verifyOtpZodSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Email tidak valid',
    })
    .nonempty({
      message: 'Email tidak boleh kosong',
    }),
  otp: z
    .string()
    .max(6, {
      message: 'OTP harus 6 Digit ',
    })
    .nonempty({
      message: 'OTP tidab boleh kosong',
    }),
});

export type TVerifyOtpSchema = z.infer<typeof verifyOtpZodSchema>;
