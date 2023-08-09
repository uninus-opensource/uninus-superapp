import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  TSalaryResponse,
  ISalaryRequest,
  TMetaErrorResponse,
  IOccupationRequest,
  TOccupationResponse,
} from "@uninus/entities";
import { OccupationGet, SalaryGet } from "./api";

export const useSalaryGet = (
  params: ISalaryRequest,
): UseQueryResult<TSalaryResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getSalary", params],
    queryFn: async () => await SalaryGet(params),
  });
};

export const useOccupationGet = (
  params: IOccupationRequest,
): UseQueryResult<TOccupationResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getOccupation", params],
    queryFn: async () => await OccupationGet(params),
  });
};
