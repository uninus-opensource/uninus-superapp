import {
  IUpdateStudentGradeRequest,
  IUpdateStudentGradeResponse,
  TMetaErrorResponse,
} from "@uninus/entities";
import { StudentGradeGet, UpdateAverage } from "./api";
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";

export const useStudentGradeUpdate = (): UseMutationResult<
  IUpdateStudentGradeRequest,
  TMetaErrorResponse,
  IUpdateStudentGradeResponse
> =>
  useMutation({
    mutationKey: ["updateBiodata"],
    mutationFn: async (payload: IUpdateStudentGradeRequest) => {
      return await UpdateAverage(payload);
    },
  });
export const useGetStudentGrade = (): UseQueryResult<
  IUpdateStudentGradeResponse,
  TMetaErrorResponse
> => {
  return useQuery({
    queryKey: ["getStudentGrade"],
    queryFn: async () => await StudentGradeGet(),
  });
};
