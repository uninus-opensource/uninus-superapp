import { z } from "zod";

export const VSRegister = z.object({
  email: z.string().min(1, { message: "Email harus diisi" }).email({
    message: "Email harus valid",
  }),
  fullname: z.string().min(2, { message: "Nama Lengkap harus diisi" }),

  phoneNumber: z
    .string({ required_error: "Nomor telepon harus diisi" })
    .min(11, { message: "Nomor telepon minimal 11 nomor" })
    .max(14, { message: "Nomor telepon maksimal 14 nomor" })
    .refine((data) => data.match(/[0-9]/g), {
      message: "Nomor telepon harus angka",
    })
    .refine((data) => data.match(/^8\d+$/g), {
      message: "Nomor harus diawali 8",
    }),

  password: z
    .string({ required_error: "Password harus diisi" })
    .min(8, { message: "Password minimal 8 karakter" })
    .refine((data) => data.match(/[A-Z]/g), {
      message: "Password harus ada huruf besar",
    })
    .refine((data) => data.match(/[0-9]/g), {
      message: "Password harus ada angka",
    }),

  confirmPassword: z.string({
    required_error: "Konfirmasi password harus diisi",
  }),
});

export type TVSRegister = z.infer<typeof VSRegister>;
