import { z } from "zod";

export const VSCreatePayment = z.object({
  payment_obligation_id: z.number().min(1),
});

export type TVSCreatePayment = z.infer<typeof VSCreatePayment>;

export const VSStatusPayment = z.object({
  order_id: z.string().nonempty(),
});

export type TVSStatusPayment = z.infer<typeof VSStatusPayment>;
