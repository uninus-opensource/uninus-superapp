import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { IReligionRequest, TReligionResponse, TMetaErrorResponse } from "@uninus/entities";
import { ReligionGet } from "./api";

export const useReligionGet = (
  params: IReligionRequest,
): UseQueryResult<TReligionResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getReligion", params],
    queryFn: async () => await ReligionGet(params),
    keepPreviousData: true,
  });
};
