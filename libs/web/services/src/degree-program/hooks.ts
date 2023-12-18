import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { TDegreeProgramResponse, TMetaErrorResponse } from "@uninus/entities";
import { DegreeProgramtGet } from "./api";

export const useDegreeProgram = (): UseQueryResult<TDegreeProgramResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["geDegreeProgram"],
    queryFn: async () => await DegreeProgramtGet(),
    keepPreviousData: true,
  });
};
