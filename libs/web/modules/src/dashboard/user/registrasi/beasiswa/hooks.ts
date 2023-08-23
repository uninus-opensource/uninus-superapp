import { useMutation, useQuery, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { BiodataUpdate, BiodatatGet } from "./api";
import {
  IScholarshipRequest,
  TScholarshipResponse,
  IUpdateStudentRequestFE,
  IUpdateStudentResponse,
  TMetaErrorResponse,
  IGetStudentResponse,
} from "@uninus/entities";

import { ScholarshipGet } from "./api";

export const useScholarshipGet = (
  params: IScholarshipRequest,
): UseQueryResult<TScholarshipResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getScholarship", params],
    queryFn: async () => await ScholarshipGet(params),
  });
};
export const useBiodataUpdate = (): UseMutationResult<
  IUpdateStudentResponse,
  TMetaErrorResponse,
  IUpdateStudentRequestFE
> =>
  useMutation({
    mutationKey: ["updateBeasiswa"],
    mutationFn: async (payload: IUpdateStudentRequestFE) => {
      return await BiodataUpdate(payload);
    },
  });
export const useGetBiodata = (): UseQueryResult<IGetStudentResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getStudentBiodata"],
    queryFn: async () => await BiodatatGet(),
  });
};
