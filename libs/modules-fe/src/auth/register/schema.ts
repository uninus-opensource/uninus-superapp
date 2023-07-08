import { z } from 'zod';

export const VSRegister = z.object({
  email: z.string().min(1, { message: 'Email harus diisi' }).email({
    message: 'Email harus valid',
  }),
  fullname: z.string().min(2, { message: 'Nama Lengkap harus diisi' }),
  nik: z
    .string()
    .regex(/^\d+$/, { message: 'NIK Harus Angka' })
    .min(1, { message: 'NIK Harus Diisi' })
    .min(16, { message: 'NIK Setidaknya ada 16 Karakter' })
    .max(16, { message: 'NIK tidak boleh lebih dari 16 Karakter' }),
  password: z
    .string()
    .min(1, { message: 'Password harus diisi' })
    .min(7, { message: 'Password harus diisi' })
    .min(8, { message: 'Password setidaknya ada 8 karakter' })
    .refine((data) => data.match(/[A-Z]/g), {
      message: 'Password harus mengandung huruf besar',
    })
    .refine((data) => data.match(/[0-9]/g), {
      message: 'Password harus mengandung angka',
    }),
});

export type TVSRegister = z.infer<typeof VSRegister>;
