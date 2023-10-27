import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { TSummaryData } from "./type";
import { TMetaErrorResponse } from "@uninus/entities";
import { GerPaymentSummaryDataMock } from "./api";

export const useGetPaymentSummary = (): UseQueryResult<TSummaryData, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["PaymentSummary"],
    queryFn: async () => await GerPaymentSummaryDataMock(),
  });
};
