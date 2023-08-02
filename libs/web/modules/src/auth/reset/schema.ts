import { z } from "zod";

const uppercaseRegex = /^(?=.*[A-Z])/;
const numberRegex = /^(?=.*\d)/;

export const VSReset = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email harus diisi" })
      .email({
        message: "Email tidak valid",
      })
      .max(60, { message: "Email tidak boleh lebih dari 60 karakter" }),
    password: z
      .string()
      .min(1, { message: "Kata Sandi harus tidak boleh kosong" })
      .min(8, { message: "Kata Sandi minimal 8" })
      .refine((value) => uppercaseRegex.test(value) && numberRegex.test(value), {
        message: "Kata Sandi harus mengandung setidaknya satu huruf besar dan satu angka",
      }),
    cpassword: z
      .string()
      .min(1, { message: "Kata Sandi harus tidak boleh kosong" })
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
