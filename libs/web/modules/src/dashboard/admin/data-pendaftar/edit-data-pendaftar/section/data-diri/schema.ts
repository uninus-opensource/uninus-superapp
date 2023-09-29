import { z } from "zod";

export const VSDataDiri = z.object({
  fullname: z.string().optional(),
  email: z.string().optional(),
  phone_number: z.string().optional(),
  nik: z
    .string()
    .min(16, { message: "NIK harus 16 karakter" })
    .max(16, { message: "NIK harusl 16 karakter" })
    .refine((data) => data.match(/[0-9]/g), {
      message: "NIK harus angka",
    }),
  nisn: z
    .string()
    .min(10, { message: "NISN harus 10 karakter" })
    .max(10, { message: "NISN harus 10 karakter" })
    .refine((data) => data.match(/[0-9]/g), {
      message: "NISN harus angka",
    }),
  no_kk: z
    .string()

    .min(16, { message: "Nomor KK harus 16 karakter" })
    .max(16, { message: "Nomor KK harusl 16 karakter" })
    .refine((data) => data.match(/[0-9]/g), {
      message: "Nomor KK harus angka",
    }),
  birth_place: z.string({ required_error: "Tempat lahir harus diisi" }),
  birth_date: z.string().optional(),
  gender_id: z.any().refine((value) => value, {
    message: "Jenis kelamin harus diisi",
  }),

  marital_status_id: z.any().refine((value) => value, {
    message: "Status harus diisi",
  }),
  religion_id: z.any().refine((value) => value, {
    message: "Agama harus diisi",
  }),

  citizenship_id: z.any().refine((value) => value, {
    message: "Kewarganegaraan harus diisi",
  }),

  country_id: z.any().refine((value) => value, {
    message: "Asal Negara harus diisi",
  }),

  province_id: z.string().optional(),

  city_id: z.string().optional(),

  subdistrict_id: z.string().optional(),

  address: z.string().optional(),

  disabilities_id: z.string().optional(),
  occupation_id: z.string().optional(),
  occupation_position_id: z.string().optional(),
  company_name: z.string().optional(),
  company_address: z.string().optional(),
  salary_id: z.string().optional(),
});

export type TVSDataDiri = z.infer<typeof VSDataDiri>;
