import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  IRegistransRequest,
  TInterestEducationPrograms,
  TMetaErrorResponse,
  TStudentsPaginatonResponse,
  TTotalRegistransRes,
} from "@uninus/entities";
import { PopularProgramsGet, RegistransGet, allStudentGet } from "./api";
import { TUsersPaginationParams } from "./type";

export const useGetRegistrans = (
  params: IRegistransRequest,
): UseQueryResult<TTotalRegistransRes, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getStudentRegistrans", params],
    queryFn: async () => await RegistransGet(params),
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
