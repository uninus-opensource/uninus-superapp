import { z } from 'zod';

export const VSLogin = z.object({
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

export type TVSLogin = z.infer<typeof VSLogin>;
