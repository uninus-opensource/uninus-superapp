import { z } from "zod";

export const VSPendaftaran = z.object({
  degree_program_id: z.any().refine((value) => value, {
    message: "Program pendidikan harus diisi",
  }),
  first_department_id: z.any().refine((value) => value, {
    message: "Program studi 1 harus diisi",
  }),
  second_department_id: z.any().refine((value) => value, {
    message: "Program studi 2 harus diisi",
  }),
  selection_path_id: z.any().refine((value) => value, {
    message: "Jalur seleksi harus diisi",
  }),
});

export type TVSPendaftaran = z.infer<typeof VSPendaftaran>;
