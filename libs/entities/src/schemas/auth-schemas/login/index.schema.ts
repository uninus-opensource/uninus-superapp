import { z } from 'zod';

export const LoginZodSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Email tidak valid',
    })
    .nonempty({
      message: 'Email tidak boleh kosong',
    }),
  password: z.string().nonempty({
    message: 'Password tidak boleh kosong',
  }),
});

export type TLoginSchema = z.infer<typeof LoginZodSchema>;
