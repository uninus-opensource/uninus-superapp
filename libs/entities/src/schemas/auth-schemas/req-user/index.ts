import { z } from 'zod';

export const VSReqUser = z.object({
  email: z
    .string()
    .email({
      message: 'Email tidak valid',
    })
    .nonempty({
      message: 'Email tidak boleh kosong',
    }),
  nik: z.string(),
});

export type TVSReqUser = z.infer<typeof VSReqUser>;
