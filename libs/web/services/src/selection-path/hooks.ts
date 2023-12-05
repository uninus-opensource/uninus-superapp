import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { TSelectionResponse, TMetaErrorResponse } from "@uninus/entities";
import { SelectionPathGet } from "./api";

export const useSelectionPath = (): UseQueryResult<TSelectionResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getSelectionPath"],
    queryFn: async () => await SelectionPathGet(),
    keepPreviousData: true,
  });
};
