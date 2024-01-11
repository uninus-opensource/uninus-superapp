import { createInsertSchema } from "drizzle-zod";
import {users, students} from "@uninus/api/models";

import { z } from "zod";

export const VSRegister = z.object({
  ...createInsertSchema(users).pick({
    email: true,
    fullname: true,
    password: true,
  }).shape,
  ...createInsertSchema(students, {
    phoneNumber: z
      .string()
      .nonempty({ message: "Nomor telepon harus diisi" })
      .min(11, { message: "Nomor telepon minimal 11 nomor" })
      .max(14, { message: "Nomor telepon maksimal 14 nomor" })
      .refine((data) => data.match(/[0-9]/g), {
        message: "Nomor telepon harus angka",
      })
      .refine((data) => data.match(/^8\d+$/g), {
        message: "Nomor harus diawali 8",
      }),
  }).pick({
    phoneNumber: true,
  }).shape,
});

export type TVSRegister = z.infer<typeof VSRegister>;
