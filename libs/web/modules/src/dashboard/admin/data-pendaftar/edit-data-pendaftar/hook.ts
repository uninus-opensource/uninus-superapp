import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { IGetStudentResponse, TMetaErrorResponse } from "@uninus/entities";
import { getStudentById } from "./api";

export const useGetStudentById = (
  id: string,
): UseQueryResult<IGetStudentResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getStudentById", id],
    queryFn: async () => await getStudentById(id),
    keepPreviousData: true,
  });
};
