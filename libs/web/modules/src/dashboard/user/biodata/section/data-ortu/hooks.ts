import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  TSalaryResponse,
  ISalaryRequest,
  TMetaErrorResponse,
  IOccupationRequest,
  TOccupationResponse,
  IOccupationPositionRequest,
  TOccupationPositionResponse,
} from "@uninus/entities";
import { OccupationGet, OccupationPositionGet, SalaryGet } from "./api";

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

export const useOccupationPositionGet = (
  params: IOccupationPositionRequest,
): UseQueryResult<TOccupationPositionResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getOccupationPosition", params],
    queryFn: async () => await OccupationPositionGet(params),
  });
};
