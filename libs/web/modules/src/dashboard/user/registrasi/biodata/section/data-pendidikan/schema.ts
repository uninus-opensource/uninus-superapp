import { z } from "zod";

export const VSDataPendidikan = z.object({
  education_type_id: z
    .number()
    .min(1, { message: "Jenis Pendidikan harus diisi" })
    .max(1, {
      message: "Jenis Pendidikan harus diisi",
    })
    .nullable()
    .optional(),
  graduation_year: z
    .number()
    .min(1, { message: "Tahun Lulus harus diisi" })
    .max(1, {
      message: "Tahun Lulus harus diisi",
    })
    .nullable()
    .optional(),
  education_npsn: z
    .string()
    .nonempty({ message: "Npsn harus diisi" })
    .min(8, { message: "Nomor NPSN harus 8 karakter" })
    .max(8, { message: "Nomor NPSN harusl 8 karakter" })
    .refine((data) => data.match(/[0-8]/g), {
      message: "Nomor NPSN harus angka",
    }),
  education_major_id: z
    .number()
    .min(1, { message: "Pendidikan Asal harus diisi" })
    .max(1, {
      message: "Pendidikan Asal harus diisi",
    })
    .nullable()
    .optional(),
});

export type TVSDataPendidikan = z.infer<typeof VSDataPendidikan>;
