import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  IMaritalStatusRequest,
  TMaritalStatusResponse,
  TMetaErrorResponse,
} from "@uninus/entities";
import { StatusGet } from "./api";

export const useStatusGet = (
  params: IMaritalStatusRequest,
): UseQueryResult<TMaritalStatusResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getStatus", params],
    queryFn: async () => await StatusGet(params),
    keepPreviousData: true,
  });
};
