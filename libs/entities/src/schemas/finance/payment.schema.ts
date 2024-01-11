import { z } from "zod";

export const VSCreatePayment = z.object({
  paymentObligationId: z.number().min(1),
});

export type TVSCreatePayment = z.infer<typeof VSCreatePayment>;

export const VSStatusPayment = z.object({
  orderId: z.string().nonempty(),
});

export type TVSStatusPayment = z.infer<typeof VSStatusPayment>;
