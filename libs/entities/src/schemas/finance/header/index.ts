import { z } from "zod";

export const VSHeaderFinance = z.object({
  timestamp: z.string(),
  signature: z.string(),
  authorization: z.string(),
});

export type TVSHeaderFinance = z.infer<typeof VSHeaderFinance>;
