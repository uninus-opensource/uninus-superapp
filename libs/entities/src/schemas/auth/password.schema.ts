import { z } from "zod";
export const VSNewPassword = z.object({
  email: z.string().email({
    message: "Email tidak valid",
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
});

export type TVSNewPassword = z.infer<typeof VSNewPassword>;

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
