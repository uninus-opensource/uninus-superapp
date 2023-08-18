import { useMutation, useQuery, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { BiodataCreate, BiodataGet, BiodataUpdate, StudentGet } from "./api";
import {
  IBiodataGetResponse,
  IGetStudentResponse,
  TBiodataRequest,
  TBiodataResponse,
  TBiodataUpdateRequest,
  TBiodataUpdateResponse,
  TMetaErrorResponse,
} from "@uninus/entities";

export const useBiodataCreate = (): UseMutationResult<
  TBiodataRequest,
  TMetaErrorResponse,
  TBiodataResponse
> =>
  useMutation({
    mutationKey: ["createBiodata"],
    mutationFn: async (payload: TBiodataRequest) => {
      return await BiodataCreate(payload);
    },
  });

export const useBiodataUpdate = (): UseMutationResult<
  TBiodataUpdateRequest,
  TMetaErrorResponse,
  TBiodataUpdateResponse
> =>
  useMutation({
    mutationKey: ["updateBiodata"],
    mutationFn: async (payload: TBiodataUpdateRequest) => {
      return await BiodataUpdate(payload);
    },
  });

export const useBiodataGet = (): UseQueryResult<IBiodataGetResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getBiodata"],
    queryFn: async () => await BiodataGet(),
  });
};
export const useStudentGet = (): UseQueryResult<IGetStudentResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getStudent"],
    queryFn: async () => await StudentGet(),
  });
};
