import { z } from "zod";

export const VSForgotPassword = z.object({
  email: z
    .string()
    .email({
      message: "Email tidak valid",
    })
    .nonempty({
      message: "Email tidak boleh kosong",
    }),
});

export type TVSForgotPassword = z.infer<typeof VSForgotPassword>;
