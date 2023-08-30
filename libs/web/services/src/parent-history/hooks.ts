import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  TMetaErrorResponse,
  IParentStatusRequest,
  TParentStatusResponse,
  IParentEducationRequest,
  TParentEducationResponse,
} from "@uninus/entities";
import { ParentEducationGet, ParentStatusGet } from "./api";

export const useParentStatusGet = (
  params: IParentStatusRequest,
): UseQueryResult<TParentStatusResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getParentStatus", params],
    queryFn: async () => await ParentStatusGet(params),
    keepPreviousData: true,
  });
};

export const useParentEducationGet = (
  params: IParentEducationRequest,
): UseQueryResult<TParentEducationResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getParentEducation", params],
    queryFn: async () => await ParentEducationGet(params),
    keepPreviousData: true,
  });
};
