import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  TYearGraduationResponse,
  IYearGraduationRequest,
  TMetaErrorResponse,
} from "@uninus/entities";
import { YearGraduationGet } from "./api";

export const useYearGraduationGet = (
  params: IYearGraduationRequest,
): UseQueryResult<TYearGraduationResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getYearGraduation", params],
    queryFn: async () => await YearGraduationGet(params),
  });
};
