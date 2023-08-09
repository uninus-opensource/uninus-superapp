import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  TReligionResponse,
  IReligionRequest,
  TMaritalStatusResponse,
  IMaritalStatusRequest,
  TMetaErrorResponse,
  IDisabilitiesRequest,
  TDisabilitiesResponse,
} from "@uninus/entities";
import { DisabilitiesGet, ReligionGet, StatusGet } from "./api";

export const useReligionGet = (
  params: IReligionRequest,
): UseQueryResult<TReligionResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getReligion", params],
    queryFn: async () => await ReligionGet(params),
  });
};

export const useStatusGet = (
  params: IMaritalStatusRequest,
): UseQueryResult<TMaritalStatusResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getStatus", params],
    queryFn: async () => await StatusGet(params),
  });
};

export const useDisabilitiesGet = (
  params: IDisabilitiesRequest,
): UseQueryResult<TDisabilitiesResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getDisabilities", params],
    queryFn: async () => await DisabilitiesGet(params),
  });
};
