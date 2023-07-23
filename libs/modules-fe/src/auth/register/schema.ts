import { z } from 'zod';

export const VSRegister = z.object({
  email: z.string().min(1, { message: 'Email harus diisi' }).email({
    message: 'Email harus valid',
  }),
  fullname: z.string().min(2, { message: 'Nama Lengkap harus diisi' }),
  phone_number: z
    .string()
    .regex(/^\d+$/, { message: 'Nomor handphone Harus Angka' })
    .min(1, { message: 'Nomor Handphone Harus Diisi' })
    .min(10, { message: 'Nomor Handphone Setidaknya ada 10 Karakter' })
    .max(15, { message: 'Nomor Handphone tidak boleh lebih dari 15 Karakter' }),
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
