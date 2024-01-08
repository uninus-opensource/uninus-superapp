import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import * as schema from "@uninus/api/models";

export const VSResendOtp = createInsertSchema(schema.users, {
  email: z
    .string()
    .email({
      message: "Email tidak valid",
    })
    .nonempty({
      message: "Email tidak boleh kosong",
    }),
}).pick({
  email: true,
});

export type TVSResendOtp = z.infer<typeof VSResendOtp>;

export const VSVerifyOtp = z.object({
  ...VSResendOtp.shape,
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
