import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  TDegreeProgramResponse,
  IDegreeProgramRequest,
  IDepartmentRequest,
  TDepartmentResponse,
  TMetaErrorResponse,
  ISelectionRequest,
  TSelectionResponse,
} from "@uninus/entities";
import { DegreeProgramGet, DepartmentGet, SelectionGet } from "./api";

export const useDegreeProgramGet = (
  params: IDegreeProgramRequest,
): UseQueryResult<TDegreeProgramResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getDegreeProgram", params],
    queryFn: async () => await DegreeProgramGet(params),
  });
};

export const useDepartmentGet = (
  params: IDepartmentRequest,
): UseQueryResult<TDepartmentResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getDepartment", params],
    queryFn: async () => await DepartmentGet(params),
    enabled: !!params,
  });
};

export const useSelectionGet = (
  params: ISelectionRequest,
): UseQueryResult<TSelectionResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getSelection", params],
    queryFn: async () => await SelectionGet(params),
  });
};
