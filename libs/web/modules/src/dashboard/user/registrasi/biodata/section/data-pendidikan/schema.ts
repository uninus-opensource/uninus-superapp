import { z } from "zod";

export const VSDataPendidikan = z.object({
  education_type_id: z.any().refine((value) => value, {
    message: "Jenis pendidikan asal harus diisi",
  }),

  graduation_year: z.any().refine((value) => value, {
    message: "Tahun lulus harus diisi",
  }),

  education_npsn: z.nullable(
    z
      .string({ required_error: "Nomor NPSN harus diisi" })
      .min(8, { message: "Nomor NPSN harus 8 karakter" })
      .max(8, { message: "Nomor NPSN harus 8 karakter" })
      .refine((data) => data.match(/[0-8]/g), {
        message: "Nomor NPSN harus angka",
      }),
  ),

  education_major_id: z.any().refine((value) => value, {
    message: "Jurusan harus diisi",
  }),
});

export type TVSDataPendidikan = z.infer<typeof VSDataPendidikan>;
