import { z } from 'zod';

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
      message: 'OTP tidak boleh kosong',
    }),
});

export type TVerifyOtpSchema = z.infer<typeof verifyOtpZodSchema>;
