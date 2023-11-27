import { z } from "zod";

export const VSLogin = z.object({
  email: z
    .string()
    .email({
      message: "Email tidak valid",
    })
    .nonempty({
      message: "Email tidak boleh kosong",
    }),
  password: z.string().nonempty({
    message: "Password tidak boleh kosong",
  }),
});

export type TVSLogin = z.infer<typeof VSLogin>;

export const VSHeaderLogin = z.object({
  "app-origin": z
    .string()

    .nonempty({
      message: "Origin tidak boleh Kosong",
    }),
});

export type TVSHeaderLogin = z.infer<typeof VSHeaderLogin>;
