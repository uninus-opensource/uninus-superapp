import { useMutation, useQuery, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import {
  BiodataUpdate,
  BiodatatGet,
  StudentGet,
  StudentGradeGet,
  UpdateAverage,
  checkPayment,
  uploadFile,
} from "./api";
import {
  IGetStudentResponse,
  IGetUserMeResponse,
  IUpdateStudentGradeRequest,
  IUpdateStudentGradeResponse,
  IUpdateStudentRequest,
  IUpdateStudentResponse,
  TMetaErrorResponse,
  TStatusPaymentRequest,
  TStatusPaymentResponse,
} from "@uninus/entities";
import { TUploadFileRequest, TUploadFileResponse } from "./type";

export const useBiodataUpdate = (): UseMutationResult<
  IUpdateStudentResponse,
  TMetaErrorResponse,
  IUpdateStudentRequest
> =>
  useMutation({
    mutationKey: ["updateBiodata"],
    mutationFn: async (payload: IUpdateStudentRequest) => {
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

export const useUploadFile = (): UseMutationResult<
  TUploadFileResponse,
  TMetaErrorResponse,
  TUploadFileRequest
> => {
  return useMutation({
    mutationKey: ["uploadFile"],
    mutationFn: async (file: TUploadFileRequest) => {
      return await uploadFile(file);
    },
  });
};

export const useStatusPayment = (): UseMutationResult<
  TStatusPaymentResponse,
  TMetaErrorResponse,
  TStatusPaymentRequest
> => {
  return useMutation({
    mutationKey: ["statusPayment"],
    mutationFn: async (payload: TStatusPaymentRequest) => {
      return await checkPayment(payload);
    },
  });
};
