import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { TRegistrationPathResponse, TMetaErrorResponse } from "@uninus/entities";
import { RegistrationPathGet } from "./api";

export const useRegistrationPath = (): UseQueryResult<
  TRegistrationPathResponse,
  TMetaErrorResponse
> => {
  return useQuery({
    queryKey: ["getRegistrationPath"],
    queryFn: async () => await RegistrationPathGet(),
    keepPreviousData: true,
  });
};
