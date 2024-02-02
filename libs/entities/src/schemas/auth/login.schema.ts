import { z } from "zod";

export const VSLogin = z.object({
  email: z
    .string({ required_error: "Email tidak boleh kosong" })
    .email({
      message: "Email tidak valid",
    })
    .min(1, {
      message: "Email tidak boleh kosong",
    }),
  password: z.string({ required_error: "Password tidak boleh kosong" }).min(1, {
    message: "Password tidak boleh kosong",
  }),
});

export type TVSLogin = z.infer<typeof VSLogin>;
