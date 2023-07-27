import { z } from 'zod';

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
