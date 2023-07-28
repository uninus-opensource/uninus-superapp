import { z } from 'zod';

export const ReqUserZodSchema = z.object({
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

export type TReqUserSchema = z.infer<typeof ReqUserZodSchema>;
