import { z } from "zod";

export const VSLogin = z.object({
  email: z
    .string()
    .email({
      message: "Email tidak valid",
    })
    .min(1, {
      message: "Email tidak boleh kosong",
    }),
  password: z.string().min(1, {
    message: "Password tidak boleh kosong",
  }),
});

export type TVSLogin = z.infer<typeof VSLogin>;
