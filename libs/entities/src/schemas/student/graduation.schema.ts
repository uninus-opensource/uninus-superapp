import { z } from "zod";

export const VSGraduationStatus = z.object({
  registrationNumber: z.string(),
});

export type TVSGraduationStatus = z.infer<typeof VSGraduationStatus>;
