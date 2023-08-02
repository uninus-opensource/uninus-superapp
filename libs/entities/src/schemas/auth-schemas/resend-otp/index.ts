import { z } from "zod";

export const VSResendOtp = z.object({
  email: z
    .string()
    .email({
      message: "Email tidak valid",
    })
    .nonempty({
      message: "Email tidak boleh kosong",
    }),
});

export type TVSResendOtp = z.infer<typeof VSResendOtp>;
