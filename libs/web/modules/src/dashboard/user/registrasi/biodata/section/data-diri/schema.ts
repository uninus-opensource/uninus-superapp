import { z } from "zod";

export const VSDataDiri = z.object({
  avatar: z.any().optional(),
  fullname: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  nik: z
    .string({
      required_error: "NIK harus diisi",
    })
    .nonempty({ message: "NIK harus diisi" })
    .min(16, { message: "NIK harus 16 karakter" })
    .max(16, { message: "NIK harusl 16 karakter" })
    .refine((data) => data.match(/[0-9]/g), {
      message: "NIK harus angka",
    }),
  nisn: z
    .string({
      required_error: "NISN harus diisi",
    })
    .nonempty({ message: "NISN harus diisi" })
    .min(10, { message: "NISN harus 10 karakter" })
    .max(10, { message: "NISN harus 10 karakter" })
    .refine((data) => data.match(/[0-9]/g), {
      message: "NISN harus angka",
    }),
  no_kk: z
    .string()
    .nonempty({ message: "Nomor KK harus diisi" })
    .min(16, { message: "Nomor KK harus 16 karakter" })
    .max(16, { message: "Nomor KK harusl 16 karakter" })
    .refine((data) => data.match(/[0-9]/g), {
      message: "Nomor KK harus angka",
    }),
  birth_place: z.string().nonempty({ message: "Tempat lahir harus diisi" }).nullable(),
  birth_date: z.string().nonempty({ message: "Tanggal lahir harus diisi" }).nullable(),
  gender_id: z
    .number()
    .min(1, { message: "Jenis kelamin harus diisi" })
    .max(1, {
      message: "Jenis kelamin harus diisi",
    })
    .optional()
    .nullable(),
  martial_status_id: z
    .number()
    .min(1, { message: "Status pernikahan harus diisi" })
    .max(1, { message: "Status pernikahan harus diisi" }),
  religion_id: z
    .number()
    .min(1, { message: "Agama harus diisi" })
    .max(1, {
      message: "Agama harus diisi",
    })
    .nullable()
    .optional(),
  citizenship_id: z
    .number()
    .min(1, { message: "Kewarganegaraan harus diisi" })
    .max(1, {
      message: "Kewarganegaraan harus diisi",
    })
    .nullable()
    .optional(),
  country_id: z
    .number()
    .min(1, { message: "Negara asal harus diisi" })
    .max(1, {
      message: "Negara asal harus diisi",
    })
    .nullable()
    .optional(),
  province_id: z
    .number()
    .min(1, { message: "Provinsi harus diisi" })
    .max(1, {
      message: "Provinsi harus diisi",
    })
    .nullable()
    .optional(),
  city_id: z
    .number()
    .min(1, { message: "Kota harus diisi" })
    .max(1, {
      message: "Kota harus diisi",
    })
    .nullable()
    .optional(),
  subdistrict_id: z
    .number()
    .min(1, { message: "Kecamatan harus diisi" })
    .max(1, {
      message: "Kecamatan harus diisi",
    })
    .nullable()
    .optional(),
  address: z.string().nonempty({ message: "Alamat harus diisi" }).nullable().optional(),
  disabilities_id: z.number().int().optional().nullable(),
  occupation_id: z.number().int().optional().nullable(),
  occupation_position_id: z.number().int().optional().nullable(),
  company_name: z.string().optional(),
  company_address: z.string().optional(),
  salary_id: z.number().int().optional().nullable(),
  marital_status_id: z.number().int().optional().nullable(),
  degree_program_id: z.number().int().optional().nullable(),
});

export type TVSDataDiri = z.infer<typeof VSDataDiri>;
