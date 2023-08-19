import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { StudentGet } from "./api";
import { IGetUserMeResponse, TMetaErrorResponse } from "@uninus/entities";

export const useStudentGet = (): UseQueryResult<IGetUserMeResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getStudent"],
    queryFn: async () => await StudentGet(),
  });
};
