import { z } from "zod";

export const VSCreateUser = z.object({
  email: z
    .string()
    .email({
      message: "Email tidak valid",
    })
    .nonempty({
      message: "Email tidak boleh kosong",
    }),
  phone_number: z
    .string()
    .nonempty({ message: "Nomor telepon harus diisi" })
    .min(11, { message: "Nomor telepon minimal 11 nomor" })
    .max(14, { message: "Nomor telepon maksimal 14 nomor" })
    .refine((data) => data.match(/[0-9]/g), {
      message: "Nomor telepon harus angka",
    })
    .refine((data) => data.match(/^8\d+$/g), {
      message: "Nomor harus diawali 8",
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

export type TVSCreateUser = z.infer<typeof VSCreateUser>;
