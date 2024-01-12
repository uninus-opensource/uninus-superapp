import { z } from "zod";

export const VSUser = z.object({
  sub: z.string(),
});

export const VSLogout = z.object({
  refreshToken: z.string().nonempty({
    message: "Refresh token tidak boleh kosong",
  }),
});

export type TVSUser = z.infer<typeof VSUser>;
export type TVSLogout = z.infer<typeof VSLogout>;
