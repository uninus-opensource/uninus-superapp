import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  TInterestEducationPrograms,
  TMetaErrorResponse,
  TStudentsPaginatonResponse,
  TTotalRegistransResponse,
} from "@uninus/entities";
import { PopularProgramsGet, RegistransGet, allStudentGet } from "./api";
import { TUsersPaginationParams } from "./type";

export const useGetRegistrans = (): UseQueryResult<
  TTotalRegistransResponse,
  TMetaErrorResponse
> => {
  return useQuery({
    queryKey: ["getStudentRegistrans"],
    queryFn: async () => await RegistransGet(),
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
