import { z } from "zod";

export const VSUser = z.object({
  sub: z.string(),
});

export const VSLogout = z.object({
  refresh_token: z.string(),
});

export type TVSUser = z.infer<typeof VSUser>;
export type TVSLogout = z.infer<typeof VSLogout>;
