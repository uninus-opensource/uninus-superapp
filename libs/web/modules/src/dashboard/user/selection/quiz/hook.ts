import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { TMetaErrorResponse, TQuestionResponse } from "@uninus/entities";
import { getQuestions } from "./api";

export const useGetQuestions = (): UseQueryResult<TQuestionResponse[], TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getQuestions"],
    queryFn: async () => await getQuestions(),
    keepPreviousData: true,
  });
};
