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

export const VSVerifyOtp = z.object({
  email: z
    .string()
    .email({
      message: "Email tidak valid",
    })
    .nonempty({
      message: "Email tidak boleh kosong",
    }),
  otp: z
    .string()
    .max(6, {
      message: "OTP harus 6 Digit ",
    })
    .nonempty({
      message: "OTP tidak boleh kosong",
    }),
});

export type TVSVerifyOtp = z.infer<typeof VSVerifyOtp>;
