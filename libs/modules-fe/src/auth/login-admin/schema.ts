import { z } from 'zod';

export const VSLoginAdmin = z.object({
  email: z
    .string()
    .min(1, { message: 'Email harus diisi' })
    .email({
      message: 'Email tidak valid',
    })
    .max(60, { message: 'Email tidak boleh lebih dari 60 karakter' }),
  password: z
    .string()
    .min(1, { message: 'Kata Sandi harus tidak boleh kosong' })
    .min(8, { message: 'Kata Sandi minimal 8' }),
  aggreement: z.boolean().optional(),
});

export type TVSLoginAdmin = z.infer<typeof VSLoginAdmin>;
