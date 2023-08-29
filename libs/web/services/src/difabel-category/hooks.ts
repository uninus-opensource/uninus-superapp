import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { IDisabilitiesRequest, TDisabilitiesResponse, TMetaErrorResponse } from "@uninus/entities";
import { DisabilitiesGet } from "./api";

export const useDisabilitiesGet = (
  params: IDisabilitiesRequest,
): UseQueryResult<TDisabilitiesResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getDisabilities", params],
    queryFn: async () => await DisabilitiesGet(params),
    keepPreviousData: true,
  });
};
