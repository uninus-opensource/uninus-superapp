import { z } from "zod";

export const VSNoPesertaUser = z.object({
  registration_number: z
    .string()
    .nonempty({ message: "No Peserta tidak boleh kosong" })
    .min(10, { message: "No Peserta harus 10 nomor" })
    .max(10, { message: "No Peserta tidak boleh lebih dari 10 nomor" }),
});

export type TVSNoPesertaUser = z.infer<typeof VSNoPesertaUser>;
