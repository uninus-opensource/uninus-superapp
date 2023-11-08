import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { TFacultyPaymentDepositData, TSummaryData, TSummaryParams } from "./type";
import { TMetaErrorResponse } from "@uninus/entities";
import { GetFacultyPaymentDeposit, GetPaymentSummaryDataMock } from "./api";

export const useGetPaymentSummary = (
  params: TSummaryParams,
): UseQueryResult<TSummaryData, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["PaymentSummary", params],
    queryFn: async () => await GetPaymentSummaryDataMock(params),
  });
};
export const useGetPaymentDeposit = (): UseQueryResult<
  TFacultyPaymentDepositData,
  TMetaErrorResponse
> => {
  return useQuery({
    queryKey: ["PaymentSummary"],
    queryFn: async () => await GetFacultyPaymentDeposit(),
  });
};
