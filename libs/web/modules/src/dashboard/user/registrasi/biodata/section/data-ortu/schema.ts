import { z } from "zod";

export const VSDataOrtu = z.object({
  father_name: z.string().nonempty({ message: "Nama Ayah harus diisi" }).nullable(),
  father_status_id: z
    .number()
    .min(1, { message: "Status harus diisi" })
    .max(1, { message: "Status harus diisi" }),
  father_education_id: z
    .number()
    .min(1, { message: "Pendidikan terahir harus diisi" })
    .max(1, { message: "Pendidikan terahir harus diisi" }),
  father_occupation_id: z
    .number()
    .min(1, { message: "Pekerjaan harus diisi" })
    .max(1, { message: "Pekerjaan harus diisi" }),
  father_occupation_position_id: z
    .number()
    .min(1, { message: "Posisi harus diisi" })
    .max(1, { message: "Posisi harus diisi" }),
  father_income: z
    .number()
    .min(1, { message: "Penghasilan harus diisi" })
    .max(1, { message: "Penghasilan harus diisi" }),
  mother_name: z.string().nonempty({ message: "Nama Ibu harus diisi" }).nullable(),
  mother_status_id: z
    .number()
    .min(1, { message: "Status harus diisi" })
    .max(1, { message: "Status harus diisi" }),
  mother_education_id: z
    .number()
    .min(1, { message: "Pendidikan terahir harus diisi" })
    .max(1, { message: "Pendidikan terahir harus diisi" }),
  mother_occupation_id: z
    .number()
    .min(1, { message: "Pekerjaan harus diisi" })
    .max(1, { message: "Pekerjaan harus diisi" }),
  mother_occupation_position_id: z
    .number()
    .min(1, { message: "Posisi harus diisi" })
    .max(1, { message: "Posisi harus diisi" }),
  mother_income: z
    .number()
    .min(1, { message: "Penghasilan harus diisi" })
    .max(1, { message: "Penghasilan harus diisi" }),
});

export type TVSDataOrtu = z.infer<typeof VSDataOrtu>;
