import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { TScholarshipResponse, TMetaErrorResponse } from "@uninus/entities";
import { ScholarshipGet } from "./api";

export const useScholarship = (): UseQueryResult<TScholarshipResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getShcolarhip"],
    queryFn: async () => await ScholarshipGet(),
    keepPreviousData: true,
  });
};
