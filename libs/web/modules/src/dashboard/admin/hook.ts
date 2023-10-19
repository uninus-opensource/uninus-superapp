import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  IInterestDepartment,
  IInterestEducationPrograms,
  IRegistransRequest,
  TInterestDepartmentResponse,
  TInterestEducationPrograms,
  TMetaErrorResponse,
  TStudentsPaginatonResponse,
  TTotalRegistransRes,
} from "@uninus/entities";
import {
  PopularProgramDepartementGet,
  PopularProgramGet,
  RegistransGet,
  allStudentGet,
} from "./api";
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

export const useGetPopularProgram = (
  params: IInterestEducationPrograms,
): UseQueryResult<TInterestEducationPrograms, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getStudentPopularProgram", params],
    queryFn: async () => await PopularProgramGet(params),
    keepPreviousData: true,
  });
};

export const useGetPopularDepartment = (
  params: IInterestDepartment,
): UseQueryResult<TInterestDepartmentResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getStudentPopularDepartment", params],
    queryFn: async () => await PopularProgramDepartementGet(params),
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
