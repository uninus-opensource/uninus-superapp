import { z } from 'zod';

export const VSForgot = z.object({
  email: z
    .string()
    .min(1, { message: 'Email harus diisi' })
    .email({
      message: 'Email tidak valid',
    })
    .max(60, { message: 'Email tidak boleh lebih dari 60 karakter' }),
});

export type TVSForgot = z.infer<typeof VSForgot>;
