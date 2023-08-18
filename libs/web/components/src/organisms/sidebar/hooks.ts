import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { StudentGet } from "./api";
import { IGetStudentResponse, TMetaErrorResponse } from "@uninus/entities";

export const useStudentGet = (): UseQueryResult<IGetStudentResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getStudent"],
    queryFn: async () => await StudentGet(),
  });
};
