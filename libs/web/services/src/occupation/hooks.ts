import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  TMetaErrorResponse,
  IOccupationRequest,
  TOccupationResponse,
  IOccupationPositionRequest,
  TOccupationPositionResponse,
  ISalaryRequest,
  TSalaryResponse,
} from "@uninus/entities";
import { OccupationGet, OccupationPositionGet, SalaryGet } from "./api";

export const useOccupationGet = (
  params: IOccupationRequest,
): UseQueryResult<TOccupationResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getOccupation", params],
    queryFn: async () => await OccupationGet(params),
    keepPreviousData: true,
  });
};

export const useOccupationPositionGet = (
  params: IOccupationPositionRequest,
): UseQueryResult<TOccupationPositionResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getOccupationPosition", params],
    queryFn: async () => await OccupationPositionGet(params),
    keepPreviousData: true,
  });
};

export const useSalaryGet = (
  params: ISalaryRequest,
): UseQueryResult<TSalaryResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getSalary", params],
    queryFn: async () => await SalaryGet(params),
    keepPreviousData: true,
  });
};
