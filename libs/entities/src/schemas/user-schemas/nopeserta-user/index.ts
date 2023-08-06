import { z } from "zod";

export const VSNoPesertaUser = z.object({
  noPeserta: z
    .string()
    .min(1, { message: "No Peserta tidak boleh kosong" })
    .max(14, { message: "No Peserta tidak boleh lebih dari 14 nomor" }),
});

export type TVSNoPesertaUser = z.infer<typeof VSNoPesertaUser>;
