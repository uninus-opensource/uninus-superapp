import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  TYearGraduationResponse,
  IYearGraduationRequest,
  TMetaErrorResponse,
  IEducationTypeRequest,
  TEducationTypeResponse,
  TEducationHistoryResponse,
  ISelectEducationHistoryRequest,
  TEducationMajorResponse,
  IEducationMajorRequest,
} from "@uninus/entities";
import { YearGraduationGet, educationHistoryGet, educationMajorGet, educationTypeGet } from "./api";

export const useYearGraduationGet = (
  params: IYearGraduationRequest,
): UseQueryResult<TYearGraduationResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getYearGraduation", params],
    queryFn: async () => await YearGraduationGet(params),
    keepPreviousData: true,
  });
};

export const useEducationTypeGet = (
  params: IEducationTypeRequest,
): UseQueryResult<TEducationTypeResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getEducationType", params],
    queryFn: async () => await educationTypeGet(params),
    keepPreviousData: true,
  });
};

export const useEducationHistoryGet = (
  params: ISelectEducationHistoryRequest,
): UseQueryResult<TEducationHistoryResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getEducationHistory", params],
    queryFn: async () => await educationHistoryGet(params),
    keepPreviousData: true,
  });
};

export const useEducationMajorGet = (
  params: IEducationMajorRequest,
): UseQueryResult<TEducationMajorResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getEducationMajor", params],
    queryFn: async () => await educationMajorGet(params),
    keepPreviousData: true,
  });
};
