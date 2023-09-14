import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { TMetaErrorResponse, TTotalRegistransResponse } from "@uninus/entities";
import { RegistransGet } from "./api";

export const useGetRegistrans = (): UseQueryResult<
  TTotalRegistransResponse,
  TMetaErrorResponse
> => {
  return useQuery({
    queryKey: ["getStudentRegistrans"],
    queryFn: async () => await RegistransGet(),
    keepPreviousData: true,
  });
};
