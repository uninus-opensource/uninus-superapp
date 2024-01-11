import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { users } from "@uninus/api/models";

export const VSNewPassword = createInsertSchema(users, {
  email: z
    .string()
    .email({
      message: "Email tidak valid",
    })
    .nonempty({
      message: "Email tidak boleh kosong",
    }),
  password: z
    .string()
    .nonempty({
      message: "Password tidak boleh kosong",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
      message:
        "Password harus memiliki setidaknya 6 karakter dan mengandung setidaknya 1 huruf kecil, 1 huruf besar, dan 1 angka. Tidak boleh mengandung simbol ",
    }),
}).pick({
  email: true,
  password: true,
});

export type TVSNewPassword = z.infer<typeof VSNewPassword>;

export const VSForgotPassword = VSNewPassword.pick({
  email: true,
});

export type TVSForgotPassword = z.infer<typeof VSForgotPassword>;
