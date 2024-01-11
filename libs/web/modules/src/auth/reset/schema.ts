import { z } from "zod";

const uppercaseRegex = /^(?=.*[A-Z])/;
const numberRegex = /^(?=.*\d)/;

export const VSReset = z
  .object({
    email: z
      .string()
      .email({
        message: "Email tidak valid",
      })
      .optional(),
    password: z
      .string()
      .min(1, { message: "Kata Sandi tidak boleh kosong" })
      .min(8, { message: "Kata Sandi minimal 8" })
      .refine((value) => uppercaseRegex.test(value) && numberRegex.test(value), {
        message: "Kata Sandi harus mengandung setidaknya satu huruf besar dan satu angka",
      }),
    cpassword: z
      .string()
      .min(1, { message: "Kata Sandi tidak boleh kosong" })
      .min(8, { message: "Kata Sandi minimal 8" })
      .refine((value) => uppercaseRegex.test(value) && numberRegex.test(value), {
        message: "Kata Sandi harus mengandung setidaknya satu huruf besar dan satu angka",
      }),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "kata sandi harus sama",
    path: ["cpassword"],
  });

export type TVSReset = z.infer<typeof VSReset>;
