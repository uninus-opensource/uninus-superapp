import { z } from "zod";
export const VSHeaders = z.object({
  "app-origin": z.string().nonempty({
    message: "Origin tidak boleh Kosong",
  }),
});

export type TVSHeaders = z.infer<typeof VSHeaders>;
