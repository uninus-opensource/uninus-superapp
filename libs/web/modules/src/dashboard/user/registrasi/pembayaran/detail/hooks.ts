import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import {
  TCreatePaymentRequest,
  TCreatePaymentResponse,
  TMetaErrorResponse,
  TPaymentObligationsResponse,
} from "@uninus/entities";
import { createPaymentPMB, getPaymentObligationPMB } from "./api";

export const useObligationPaymentPMB = (): UseQueryResult<
  TPaymentObligationsResponse,
  TMetaErrorResponse
> => {
  return useQuery({
    queryKey: ["getPaymentObligationPMB"],
    queryFn: async () => await getPaymentObligationPMB(),
    keepPreviousData: true,
  });
};

export const useCreatePaymentPMB = (): UseMutationResult<
  TCreatePaymentResponse,
  TMetaErrorResponse,
  TCreatePaymentRequest
> => {
  return useMutation({
    mutationKey: ["createPaymentPMB"],
    mutationFn: async (payload: TCreatePaymentRequest) => await createPaymentPMB(payload),
  });
};
