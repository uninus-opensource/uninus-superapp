import { z } from "zod";

export const VSDataOrtu = z.object({
  father_name: z.nullable(
    z
      .string({ required_error: "Nama Ayah harus diisi" })
      .nonempty({ message: "Nama Ayah harus diisi" }),
  ),
  father_status_id: z.any().refine((value) => value, {
    message: "Status ayah harus diisi",
  }),
  father_education_id: z.any().refine((value) => value, {
    message: "Pendidikan ayah harus diisi",
  }),
  father_occupation_id: z.string().nullable().optional(),
  father_position: z.string().nullable().optional(),
  father_salary_id: z.string().nullable().optional(),
  mother_name: z.nullable(
    z
      .string({ required_error: "Nama Ibu harus diisi" })
      .nonempty({ message: "Nama Ibu harus diisi" }),
  ),
  mother_status_id: z.any().refine((value) => value, {
    message: "Status ibu harus diisi",
  }),
  mother_education_id: z.any().refine((value) => value, {
    message: "Pendidikan ibu harus diisi",
  }),
  mother_occupation_id: z.string().nullable().optional(),
  mother_position: z.string().nullable().optional(),
  mother_salary_id: z.string().nullable().optional(),
  parent_province_id: z.any().refine((value) => value, {
    message: "Provinsi harus diisi",
  }),
  parent_city_id: z.any().refine((value) => value, {
    message: "Kota harus diisi",
  }),
  parent_subdistrict_id: z.any().refine((value) => value, {
    message: "Kecamatan harus diisi",
  }),
  parent_address: z.nullable(z.string().nonempty({ message: "Alamat harus diisi" })),

  guardian_name: z.string().nullable().optional(),
  guardian_status_id: z.string().nullable().optional(),
  guardian_education_id: z.string().nullable().optional(),
  guardian_occupation_id: z.string().nullable().optional(),
  guardian_position: z.string().nullable().optional(),
  guardian_salary_id: z.string().nullable().optional(),
  guardian_province_id: z.string().nullable().optional(),
  guardian_city_id: z.string().nullable().optional(),
  guardian_subdistrict_id: z.string().nullable().optional(),
  guardian_address: z.string().nullable().optional(),
});

export type TVSDataOrtu = z.infer<typeof VSDataOrtu>;
