import { z } from "zod";

export const VSRegistrationNumber = z.object({
  registration_number: z.string(),
});

export type TVSCRegistrationNumber = z.infer<typeof VSRegistrationNumber>;
