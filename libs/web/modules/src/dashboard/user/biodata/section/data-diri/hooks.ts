import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { TReligionResponse, IReligionRequest, TMetaErrorResponse } from "@uninus/entities";
import { ReligionGet } from "./api";

export const useReligionGet = (
  params: IReligionRequest,
): UseQueryResult<TReligionResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getProvince", params],
    queryFn: async () => await ReligionGet(params),
  });
};
