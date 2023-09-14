import { z } from "zod";

export const VSDataNilai = z.object({
  mtk1: z.number().min(0).max(100).optional(),
  mtk2: z.number().min(0).max(100).optional(),
  mtk3: z.number().min(0).max(100).optional(),
  mtk4: z.number().min(0).max(100).optional(),
  bind1: z.number().min(0).max(100).optional(),
  bind2: z.number().min(0).max(100).optional(),
  bind3: z.number().min(0).max(100).optional(),
  bind4: z.number().min(0).max(100).optional(),
  bing1: z.number().min(0).max(100).optional(),
  bing2: z.number().min(0).max(100).optional(),
  bing3: z.number().min(0).max(100).optional(),
  bing4: z.number().min(0).max(100).optional(),
  utbk_kk: z.number().min(0).max(100).optional(),
  utbk_pu: z.number().min(0).max(100).optional(),
  utbk_ppu: z.number().min(0).max(100).optional(),
  utbk_kmbm: z.number().min(0).max(100).optional(),
  average_utbk: z.number().min(0).max(100).optional(),
  average_grade: z.number().min(0).max(100).optional(),
  semester: z.string(),
  subject: z.string(),
  student_grade: z.array(
    z.object({
      subject: z.string(),
      semester: z.string(),
      grade: z.number(),
    }),
  ),
  UTBK: z.custom<File>((val) => val instanceof File, {
    message: "File harus diisi",
  }),
  dokumen1: z.custom<File>((val) => val instanceof File, {
    message: "File harus diisi",
  }),
  dokumen2: z.custom<File>((val) => val instanceof File, {
    message: "File harus diisi",
  }),
  dokumen3: z.custom<File>((val) => val instanceof File, {
    message: "File harus diisi",
  }),
  dokumen4: z.custom<File>((val) => val instanceof File, {
    message: "File harus diisi",
  }),
});

export type TVSDataNilai = z.infer<typeof VSDataNilai>;
