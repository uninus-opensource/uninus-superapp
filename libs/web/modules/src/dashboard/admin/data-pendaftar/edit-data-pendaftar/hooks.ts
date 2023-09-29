import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import {
  IGetStudentResponse,
  IUpdateStudentRequest,
  IUpdateStudentResponse,
  TMetaErrorResponse,
} from "@uninus/entities";
import { getStudentById, updateBiodataById } from "./api";

export const useGetStudentById = (
  id: string,
): UseQueryResult<IGetStudentResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getStudentById", id],
    queryFn: async () => await getStudentById(id),
    keepPreviousData: true,
  });
};

export const useBiodataUpdateById = (
  id: string,
): UseMutationResult<IUpdateStudentResponse, TMetaErrorResponse, IUpdateStudentRequest> => {
  return useMutation({
    mutationKey: ["updateBiodataById", id],
    mutationFn: async (payload: IUpdateStudentRequest) => await updateBiodataById(payload, id),
  });
};
