import { z } from "zod";

export const VSUpdateStudent = z.object({
  avatar: z.any().optional(),
  fullname: z.string().optional(),
  email: z.string().optional(),
  nik: z.string().min(16, { message: "Minimal" }).max(16).optional(),
  nisn: z.string().min(10).max(10).optional(),
  no_kk: z.string().min(16).max(16).optional(),
  birth_place: z.string().optional(),
  birth_date: z.string().optional(),
  gender_id: z.number().int().optional(),
  phone_number: z.string().optional(),
  martial_status_id: z.number().int().optional(),
  religion_id: z.number().int().optional(),
  citizenship_id: z.number().int().optional(),
  marital_status_id: z.number().int().optional(),
  country_id: z.number().int().optional(),
  address: z.string().optional(),
  subdistrict_id: z.number().int().optional(),
  province_id: z.number().int().optional(),
  city_id: z.number().int().optional(),
  education_type_id: z.number().int().optional(),
  graduation_year: z.string().optional(),
  education_major_id: z.number().optional(),
  education_npsn: z.string().optional(),
  father_name: z.string().optional(),
  mother_name: z.string().optional(),
  guardian_name: z.string().optional(),
  father_status_id: z.number().optional(),
  mother_status_id: z.number().optional(),
  guardian_status_id: z.number().optional(),
  parent_address: z.string().optional(),
  parent_subdistrict_id: z.number().optional(),
  parent_province_id: z.number().optional(),
  parent_city_id: z.number().optional(),
  father_education_id: z.number().int().optional(),
  mother_education_id: z.number().int().optional(),
  guardian_education_id: z.number().int().optional(),
  father_occupation_id: z.number().int().optional(),
  mother_occupation_id: z.number().int().optional(),
  guardian_occupation_id: z.number().int().optional(),
  father_salary_id: z.number().int().optional(),
  mother_salary_id: z.number().int().optional(),
  guardian_salary_id: z.number().int().optional(),
  guardian_address: z.string().optional(),
  guardian_subdistrict_id: z.number().optional(),
  guardian_province_id: z.number().optional(),
  guardian_city_id: z.number().optional(),
  faculty_id: z.number().int().optional(),
  disabilities_id: z.number().int().optional(),
  occupation_id: z.number().int().optional(),
  occupation_position_id: z.number().int().optional(),
  company_name: z.string().optional(),
  company_address: z.string().optional(),
  salary_id: z.number().int().optional(),
  education_programs_id: z.number().int().optional(),
  study_program_id: z.number().int().optional(),
  selection_type_id: z.number().int().optional(),
});

export type TVSUpdateStudent = z.infer<typeof VSUpdateStudent>;

export const VSDataDiri = z.object({
  avatar: z.any().optional(),
  fullname: z.string().optional(),
  email: z.string().optional(),
  phone_number: z.string().optional(),
  nik: z
    .string()
    .nonempty({ message: "NIk harus diisi" })
    .min(16, { message: "NIk harus 16 karakter" })
    .max(16, { message: "NIk harusl 16 karakter" })
    .refine((data) => data.match(/[0-9]/g), {
      message: "NIK harus angka",
    }),
  nisn: z
    .string()
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
  birth_place: z.string().nonempty({ message: "Tempat lahir harus diisi" }),
  birth_date: z.string().nonempty({ message: "Tanggal lahir harus diisi" }),
  gender_id: z.number().min(1, { message: "Jenis kelamin harus diisi" }).max(1, {
    message: "Jenis kelamin harus diisi",
  }),
  martial_status_id: z
    .number()
    .min(1, { message: "Status pernikahan harus diisi" })
    .max(1, { message: "Status pernikahan harus diisi" }),
  religion_id: z.number().min(1, { message: "Agama harus diisi" }).max(1, {
    message: "Agama harus diisi",
  }),
  citizenship_id: z.number().int().min(1, { message: "Kewarganegaraan harus diisi" }).max(1, {
    message: "Kewarganegaraan harus diisi",
  }),
  country_id: z.number().int().min(1, { message: "Negara asal harus diisi" }).max(1, {
    message: "Negara asal harus diisi",
  }),
  province_id: z.number().int().min(1, { message: "Provinsi harus diisi" }).max(1, {
    message: "Provinsi harus diisi",
  }),
  city_id: z.number().int().min(1, { message: "Kota harus diisi" }).max(1, {
    message: "Kota harus diisi",
  }),
  subdistrict_id: z.number().int().min(1, { message: "Kecamatan harus diisi" }).max(1, {
    message: "Kecamatan harus diisi",
  }),
  address: z.string().nonempty({ message: "Alamat harus diisi" }),
  disabilities_id: z.number().int().optional(),
  occupation_id: z.number().int().optional(),
  occupation_position_id: z.number().int().optional(),
  company_name: z.string().optional(),
  company_address: z.string().optional(),
  salary_id: z.number().int().optional(),
});

export type TVSDataDiri = z.infer<typeof VSDataDiri>;
