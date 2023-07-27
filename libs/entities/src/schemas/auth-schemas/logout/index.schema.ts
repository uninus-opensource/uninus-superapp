import { z } from 'zod';

export const UserZodSchema = z.object({
  sub: z.string(),
});

export const LogoutZodSchema = z.object({
  refresh_token: z.string(),
});

export type TUserDtoSchema = z.infer<typeof UserZodSchema>;
export type TLogoutSchema = z.infer<typeof LogoutZodSchema>;
