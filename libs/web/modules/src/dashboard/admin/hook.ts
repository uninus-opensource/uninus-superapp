import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import {
  TCreateScholarshipRequest,
  TDegreeProgramResponse,
  TDepartmentResponse,
  TEducationTypeResponse,
  TFacultyResponse,
  TInterestEducationPrograms,
  TMetaErrorResponse,
  TScholarshipResponse,
  TSelectionResponse,
  TStudentsPaginatonResponse,
  TTotalRegistransResponse,
} from "@uninus/entities";
import {
  DegreeProgramGet,
  PopularProgramsGet,
  RegistransGet,
  allStudentGet,
  beasiswaGet,
  createScholarship,
  educationGet,
  facultyGet,
  prodiGet,
  seleksiGet,
} from "./api";
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
export const useGetFaculties = (): UseQueryResult<TFacultyResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getFaculties"],
    queryFn: async () => await facultyGet(),
    keepPreviousData: true,
  });
};

export const useGetProdi = (): UseQueryResult<TDepartmentResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getProdi"],
    queryFn: async () => await prodiGet(),
    keepPreviousData: true,
  });
};
export const useGetSeleksi = (): UseQueryResult<TSelectionResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getSeleksi"],
    queryFn: async () => await seleksiGet(),
    keepPreviousData: true,
  });
};
export const useGetEducation = (): UseQueryResult<TEducationTypeResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getEducation"],
    queryFn: async () => await educationGet(),
    keepPreviousData: true,
  });
};
export const useGetBeasiswa = (): UseQueryResult<TScholarshipResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getBeasiswa"],
    queryFn: async () => await beasiswaGet(),
    keepPreviousData: true,
  });
};

export const useScholarshipCreate = (): UseMutationResult<
  TScholarshipResponse,
  TMetaErrorResponse,
  TCreateScholarshipRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["create-data-scholarship"],
    mutationFn: async (payload) => await createScholarship(payload),
  });
};
export const useProgramGet = (): UseQueryResult<TDegreeProgramResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["DegreProgramId"],
    queryFn: async () => await DegreeProgramGet(),
  });
};
