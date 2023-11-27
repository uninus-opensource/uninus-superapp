import { z } from "zod";

export const VSGraduationStatus = z.object({
  registration_number: z.string(),
});

export type TVSGraduationStatus = z.infer<typeof VSGraduationStatus>;
