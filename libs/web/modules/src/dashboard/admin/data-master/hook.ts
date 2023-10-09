import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import {
  ISelectFacultyRequest,
  TCreateDepartmentRequest,
  TCreateEducationRequest,
  TCreateFacultyRequest,
  TCreateScholarshipRequest,
  TCreateSelectionPathRequest,
  TDegreeProgramResponse,
  TDepartmentResponse,
  TEducationHistoryResponse,
  TEducationTypeResponse,
  TFacultyResponse,
  TMetaErrorResponse,
  TScholarshipResponse,
  TSelectionResponse,
  TUpdateDepartmentRequest,
  TUpdateFacultyRequest,
  TUpdateScholarshipRequest,
  TUpdateSelectionPathRequest,
} from "@uninus/entities";
import {
  DegreeProgramGet,
  beasiswaGet,
  createDepartment,
  createFaculty,
  createScholarship,
  createSchool,
  createSelection,
  deleteDepartment,
  deleteFaculty,
  deleteScholarship,
  deleteSelectionPath,
  educationGet,
  facultyGet,
  prodiGet,
  seleksiGet,
  updateDepartment,
  updateFaculty,
  updateScholarship,
  updateSelectionPath,
} from "./api";

export const useGetFaculties = (
  params: ISelectFacultyRequest,
): UseQueryResult<TFacultyResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getFaculties", params],
    queryFn: async () => await facultyGet(params),
    enabled: !!params,
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

export const useProgramGet = (): UseQueryResult<TDegreeProgramResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["DegreProgramId"],
    queryFn: async () => await DegreeProgramGet(),
  });
};

export const useDepartmentCreate = (): UseMutationResult<
  TDepartmentResponse,
  TMetaErrorResponse,
  TCreateDepartmentRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["create-department"],
    mutationFn: async (payload) => await createDepartment(payload),
  });
};

export const useSchoolCreate = (): UseMutationResult<
  TEducationHistoryResponse,
  TMetaErrorResponse,
  TCreateEducationRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["create-school"],
    mutationFn: async (payload) => await createSchool(payload),
  });
};

export const useSelectionCreate = (): UseMutationResult<
  TSelectionResponse,
  TMetaErrorResponse,
  TCreateSelectionPathRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["create-selection-path"],
    mutationFn: async (payload) => await createSelection(payload),
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

export const useFacultyCreate = (): UseMutationResult<
  TFacultyResponse,
  TMetaErrorResponse,
  TCreateFacultyRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["create-faculty"],
    mutationFn: async (payload) => await createFaculty(payload),
  });
};
export const useFacultyDelete = (): UseMutationResult<
  TFacultyResponse,
  TMetaErrorResponse,
  number,
  unknown
> => {
  return useMutation({
    mutationKey: ["delete-faculty"],
    mutationFn: async (id) => await deleteFaculty(id),
  });
};
export const useScholarshipDelete = (): UseMutationResult<
  TScholarshipResponse,
  TMetaErrorResponse,
  number,
  unknown
> => {
  return useMutation({
    mutationKey: ["delete-scholarship"],
    mutationFn: async (id) => await deleteScholarship(id),
  });
};
export const useSelectionDelete = (): UseMutationResult<
  TSelectionResponse,
  TMetaErrorResponse,
  number,
  unknown
> => {
  return useMutation({
    mutationKey: ["delete-selection-path"],
    mutationFn: async (id) => await deleteSelectionPath(id),
  });
};
export const useDepartmentDelete = (): UseMutationResult<
  TDepartmentResponse,
  TMetaErrorResponse,
  number,
  unknown
> => {
  return useMutation({
    mutationKey: ["delete-department"],
    mutationFn: async (id) => await deleteDepartment(id),
  });
};
export const useFacultyUpdate = (): UseMutationResult<
  TFacultyResponse,
  TMetaErrorResponse,
  TUpdateFacultyRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["update-faculty"],
    mutationFn: async (payload) => await updateFaculty(payload),
  });
};

export const useScholarshipUpdate = (): UseMutationResult<
  TScholarshipResponse,
  TMetaErrorResponse,
  TUpdateScholarshipRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["update-scholarship"],
    mutationFn: async (payload) => await updateScholarship(payload),
  });
};

export const useDepartmentUpdate = (): UseMutationResult<
  TDepartmentResponse,
  TMetaErrorResponse,
  TUpdateDepartmentRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["update-department"],
    mutationFn: async (payload) => await updateDepartment(payload),
  });
};

export const useSelectionUpdate = (): UseMutationResult<
  TSelectionResponse,
  TMetaErrorResponse,
  TUpdateSelectionPathRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["update-selection-path"],
    mutationFn: async (payload) => await updateSelectionPath(payload),
  });
};
