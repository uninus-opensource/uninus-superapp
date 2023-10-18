import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  IRegistransRequest,
  TInterestEducationPrograms,
  TMetaErrorResponse,
  TStudentsPaginatonResponse,
  TTotalRegistransRes,
} from "@uninus/entities";
import { PopularProgramsGet, RegistransGet, RegistransGetData, allStudentGet } from "./api";
import { TUsersPaginationParams } from "./type";

export const useGetRegistrans = (): UseQueryResult<TTotalRegistransRes, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getStudentRegistrans"],
    queryFn: async () => await RegistransGet(),
    keepPreviousData: true,
  });
};

export const useGetRegistransData = (
  params: IRegistransRequest,
): UseQueryResult<TTotalRegistransRes, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getStudentRegistrans", params],
    queryFn: async () => await RegistransGetData(params),
    keepPreviousData: true,
  });
};

export const useGetPopularData = (): UseQueryResult<
  TInterestEducationPrograms,
  TMetaErrorResponse
> => {
  return useQuery({
    queryKey: ["getPopularPrograms"],
    queryFn: async () => await PopularProgramsGet(),
    keepPreviousData: true,
  });
};

export const useGetAllStudent = (
  params: TUsersPaginationParams,
): UseQueryResult<TStudentsPaginatonResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getAllStudent", params],
    queryFn: async () => await allStudentGet(params),
    keepPreviousData: true,
  });
};
