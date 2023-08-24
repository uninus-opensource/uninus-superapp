import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  TSalaryResponse,
  ISalaryRequest,
  TMetaErrorResponse,
  IOccupationRequest,
  TOccupationResponse,
  IOccupationPositionRequest,
  TOccupationPositionResponse,
  IParentStatusRequest,
  TParentStatusResponse,
  IParentEducationRequest,
  TParentEducationResponse,
} from "@uninus/entities";
import {
  OccupationGet,
  OccupationPositionGet,
  ParentEducationGet,
  ParentStatusGet,
  SalaryGet,
} from "./api";

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

export const useParentStatusGet = (
  params: IParentStatusRequest,
): UseQueryResult<TParentStatusResponse, TParentStatusResponse> => {
  return useQuery({
    queryKey: ["getParentStatus", params],
    queryFn: async () => await ParentStatusGet(params),
  });
};

export const useParentEducationGet = (
  params: IParentEducationRequest,
): UseQueryResult<TParentEducationResponse, TParentEducationResponse> => {
  return useQuery({
    queryKey: ["getParentEducation", params],
    queryFn: async () => await ParentEducationGet(params),
  });
};
