import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import {
  TDegreeProgramResponse,
  IDegreeProgramRequest,
  ISelectDepartmentRequest,
  TDepartmentResponse,
  TMetaErrorResponse,
  ISelectionRequest,
  TSelectionResponse,
  IStudentData,
  TRegistrationPathResponse,
} from "@uninus/entities";
import {
  DegreeProgramGet,
  DepartmentGet,
  RegistrationsPath,
  SelectionGet,
  StudentUpdate,
} from "./api";

export const useDegreeProgramGet = (
  params: IDegreeProgramRequest,
): UseQueryResult<TDegreeProgramResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getDegreeProgram", params],
    queryFn: async () => await DegreeProgramGet(params),
  });
};

export const useDepartmentGet = (
  params: ISelectDepartmentRequest,
): UseQueryResult<TDepartmentResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getDepartment", params],
    queryFn: async () => await DepartmentGet(params),
    enabled: !!params,
  });
};

export const useSelectionGet = (
  params: ISelectionRequest,
): UseQueryResult<TSelectionResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getSelection", params],
    queryFn: async () => await SelectionGet(params),
  });
};

export const useStudentUpdate = (): UseMutationResult<
  IStudentData,
  TMetaErrorResponse,
  IStudentData
> =>
  useMutation({
    mutationKey: ["updateStudent"],
    mutationFn: async (payload: IStudentData) => {
      return await StudentUpdate(payload);
    },
  });

export const useRegistrationsPathGet = (): UseQueryResult<
  TRegistrationPathResponse,
  TMetaErrorResponse
> => {
  return useQuery({
    queryKey: ["getRegistrationsPath"],
    queryFn: async () => await RegistrationsPath(),
  });
};
