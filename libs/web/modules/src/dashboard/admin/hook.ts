import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  TInterestEducationPrograms,
  TMetaErrorResponse,
  TTotalRegistransResponse,
} from "@uninus/entities";
import { PopularProgramsGet, RegistransGet } from "./api";

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
