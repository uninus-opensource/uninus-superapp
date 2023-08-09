import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { TSalaryResponse, ISalaryRequest, TMetaErrorResponse } from "@uninus/entities";
import { SalaryGet } from "./api";

export const useSalaryGet = (
  params: ISalaryRequest,
): UseQueryResult<TSalaryResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getSalary", params],
    queryFn: async () => await SalaryGet(params),
  });
};
