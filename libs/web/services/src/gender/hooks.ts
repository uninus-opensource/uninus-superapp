import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { IGenderRequest, TGenderResponse, TMetaErrorResponse } from "@uninus/entities";
import { GenderGet } from "./api";

export const useGenderGet = (
  params: IGenderRequest,
): UseQueryResult<TGenderResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getGender", params],
    queryFn: async () => await GenderGet(params),
    keepPreviousData: true,
  });
};
