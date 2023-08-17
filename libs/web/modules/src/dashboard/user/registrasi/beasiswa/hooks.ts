import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { TScholarshipResponse, IScholarshipRequest, TMetaErrorResponse } from "@uninus/entities";
import { ScholarshipGet } from "./api";

export const useScholarshipGet = (
  params: IScholarshipRequest,
): UseQueryResult<TScholarshipResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getScholarship", params],
    queryFn: async () => await ScholarshipGet(params),
  });
};
