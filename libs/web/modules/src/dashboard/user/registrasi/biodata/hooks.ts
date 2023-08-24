import { useMutation, useQuery, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { BiodataUpdate, BiodatatGet, StudentGet } from "./api";
import {
  IGetStudentResponse,
  IGetUserMeResponse,
  IUpdateStudentRequestFE,
  IUpdateStudentResponse,
  TMetaErrorResponse,
} from "@uninus/entities";

export const useBiodataUpdate = (): UseMutationResult<
  IUpdateStudentResponse,
  TMetaErrorResponse,
  IUpdateStudentRequestFE
> =>
  useMutation({
    mutationKey: ["updateBiodata"],
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

export const useStudentGet = (): UseQueryResult<IGetUserMeResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getStudent"],
    queryFn: async () => await StudentGet(),
  });
};
