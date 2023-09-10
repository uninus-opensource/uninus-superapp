import { useMutation, useQuery, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import {
  BiodataUpdate,
  BiodatatGet,
  StudentGet,
  StudentGradeGet,
  UpdateAverage,
  uploadFile,
} from "./api";
import {
  IGetStudentResponse,
  IGetUserMeResponse,
  IStudentData,
  IUpdateStudentGradeRequest,
  IUpdateStudentGradeResponse,
  IUpdateStudentRequestFE,
  IUpdateStudentResponse,
  TMetaErrorResponse,
} from "@uninus/entities";
import { TUploadImageRequest, TUploadImageResponse } from "./type";

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
    keepPreviousData: true,
  });
};

export const useStudentGet = (): UseQueryResult<IGetUserMeResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getStudent"],
    queryFn: async () => await StudentGet(),
    keepPreviousData: true,
  });
};

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

export const useUploadImage = (): UseMutationResult<
  TUploadImageResponse,
  TMetaErrorResponse,
  TUploadImageRequest
> => {
  return useMutation({
    mutationKey: ["uploadFile"],
    mutationFn: async (file: TUploadImageRequest) => {
      return await uploadFile(file);
    },
  });
};
