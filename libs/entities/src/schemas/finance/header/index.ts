import { z } from "zod";

export const VSHeaderFinance = z.object({
  timestamp: z.number(),
  signature: z.string(),
  authorization: z.string(),
});

export type TVSHeaderFinance = z.infer<typeof VSHeaderFinance>;
