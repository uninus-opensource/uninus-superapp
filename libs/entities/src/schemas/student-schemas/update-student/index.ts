import { z } from "zod";
import { EGender, EReligion, ECitizenship } from "../../../enum";

export const VSUpdateStudent = z.object({
  avatar: z.any().optional(),
  fullname: z.string().optional(),
  nik: z.string().min(16).max(16).optional(),
  nisn: z.string().min(10).max(10).optional(),
  birth_place: z.string().optional(),
  birth_date: z.string().optional(),
  gender_id: z.number().int().optional(),
  phone_number: z.string().optional(),
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
  education_programs_id: z.number().int().optional(),
  study_program_id: z.number().int().optional(),
  selection_type_id: z.number().int().optional(),
});

export type TVSUpdateStudent = z.infer<typeof VSUpdateStudent>;

export const VSDataDiri = z.object({
  avatar: z.string().optional(),
  fullname: z.string().optional(),
  email: z.string().optional(),
  phone_number: z.string().optional(),
  nik: z.nullable(
    z
      .string()
      .nonempty({ message: "NIK tidak boleh kosong" })
      .min(16, { message: "NIK harus 16 digit" })
      .max(16, { message: "NIK harus 16 digit" }),
  ),

  nisn: z.nullable(
    z
      .string()
      .nonempty({
        message: "NISN tidak boleh kosong",
      })
      .min(10, { message: "NISN harus 10 karakter" })
      .max(10, {
        message: "NISN harus 10 karakter",
      }),
  ),

  no_kk: z.nullable(
    z
      .string()
      .nonempty({
        message: "No KK tidak boleh kosong",
      })
      .max(16, {
        message: "No KK harus 16 karakter",
      })
      .min(16, {
        message: "No KK harus 16 karakter",
      }),
  ),

  gender_id: z.nullable(z.string().nonempty({ message: "Jenis Kelamin harus dipilih" })),
  religion_id: z.nullable(z.string().min(1, { message: "Religion harus dipilih" })),
  birth_place: z.nullable(z.string().nonempty({ message: "Tempat Lahir tidak boleh kosong" })),
  birth_date: z.nullable(z.string().optional()),
  martial_status_id: z.nullable(z.string().min(1, { message: "Status harus dipilih" })),
  citizenship_id: z.nullable(z.string().min(1, { message: "Kewarganegaraan harus dipilih" })),
  country_id: z.nullable(z.string().min(1, { message: "Negara harus dipilih" })),
  province_id: z.nullable(z.string().min(1, { message: "Provinsi harus dipilih" })),
  subdistrict_id: z.nullable(z.string().min(1, { message: "Kecamatan harus dipilih" })),
  address: z.nullable(z.string().nonempty({ message: "Alamat tidak boleh kosong" })),
  occupation_id: z.nullable(z.string().min(1, { message: "Pekerjaan harus dipilih" })),
  occupation_position_id: z.nullable(z.string().min(1, { message: "Jabatan harus dipilih" })),
  company_name: z.nullable(z.string().optional()),
  company_address: z.nullable(z.string().optional()),
  salary_id: z.nullable(z.string().optional()),
  disabilities_id: z.nullable(z.string().optional()),
  city_id: z.nullable(z.string().min(1, { message: "Kota harus dipilih" })),
});

export type TVSDataDiri = z.infer<typeof VSDataDiri>;

export const VSDataPendidikan = z.object({
  education_type_id: z.nullable(z.string().nonempty({ message: "Jenis Pendidikan harus dipilih" })),
  education_major_id: z.nullable(z.string().min(1, { message: "Jurusan harus dipilih" })),
  graduation_year: z.nullable(z.string().nonempty({ message: "Tahun Lulus tidak boleh kosong" })),
  education_npsn: z.nullable(z.string().nonempty({ message: "NPSN tidak boleh kosong" })),
});

export type TVSDataPendidikan = z.infer<typeof VSDataPendidikan>;
