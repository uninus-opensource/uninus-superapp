import { z } from "zod";

export const VSPayment = z.object({
  fullname: z.string().nonempty({
    message: "Nama tidak boleh kosong",
  }),
  phone_number: z.string().nonempty({
    message: "Nomor telepon tidak boleh kosong",
  }),
  bank_code: z.string().nonempty({
    message: "Bank tidak boleh kosong",
  }),
});

export type TVSPayment = z.infer<typeof VSPayment>;
