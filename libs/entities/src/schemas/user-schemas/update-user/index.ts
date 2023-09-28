import { z } from "zod";

export const VSUpdateUser = z
  .object({
    email: z
      .string()
      .email({
        message: "Email tidak valid",
      })
      .optional(),
    fullname: z.string().optional(),
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
        message:
          "Password harus memiliki setidaknya 6 karakter dan mengandung setidaknya 1 huruf kecil, 1 huruf besar, dan 1 angka. Tidak boleh mengandung simbol ",
      })
      .optional(),
  })
  .optional();

export type TVSUpdateUser = z.infer<typeof VSUpdateUser>;
