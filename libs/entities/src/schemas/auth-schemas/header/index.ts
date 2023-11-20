import { z } from "zod";

export const VSHeaderLogin = z.object({
  "app-origin": z
    .string()

    .nonempty({
      message: "Email tidak boleh kosong",
    }),
});

export type TVSHeaderLogin = z.infer<typeof VSHeaderLogin>;
