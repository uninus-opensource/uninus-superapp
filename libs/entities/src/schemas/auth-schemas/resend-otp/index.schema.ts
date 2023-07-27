import { z } from 'zod';

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
