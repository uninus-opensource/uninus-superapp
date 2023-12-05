import {
  TCreatePaymentRequest,
  TCreatePaymentResponse,
  TPaymentObligationsResponse,
} from "@uninus/entities";
import { api } from "@uninus/web/services";

export const getPaymentObligationPMB = async (): Promise<TPaymentObligationsResponse> => {
  const { data } = await api.get("/student/payment-obligations?search=PMB");
  return data;
};

export const createPaymentPMB = async (
  payload: TCreatePaymentRequest,
): Promise<TCreatePaymentResponse> => {
  const { data } = await api.post("/finance/payment/create", payload);
  return data;
};
