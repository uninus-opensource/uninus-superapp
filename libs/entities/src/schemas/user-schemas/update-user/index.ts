import { z } from "zod";

export const VSUpdateUser = z.object({
  email: z
    .string()
    .email({
      message: "Email tidak valid",
    })
    .nonempty({
      message: "Email tidak boleh kosong",
    }),
  fullname: z.string().nonempty({
    message: "Nama lengkap tidak boleh kosong",
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
  role_id: z.number().optional(),
  photo: z.string().optional(),
  employee_id: z.number().optional(),
  lecture_id: z.number().optional(),
});

export type TVSUpdateUser = z.infer<typeof VSUpdateUser>;
