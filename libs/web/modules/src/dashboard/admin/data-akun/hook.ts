import {
  TGetUserDataResponse,
  TMetaErrorResponse,
  TRegisterRequest,
  TUsersPaginatonResponse,
} from "@uninus/entities";
import {
  CreateDataUser,
  UpdateDataUser,
  DeleteDataUser,
  GetUserRole,
  GetDataUserPagination,
} from "./api";
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { TDataAkun, TUpdateDataAkun, TUserRoles } from "./types";
import { filterActionUser } from "./store";
import { TUsersPaginationParams } from "../type";

export const useDataUsers = (
  params: TUsersPaginationParams,
): UseQueryResult<TUsersPaginatonResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["get-data-users", params],
    queryFn: async () => await GetDataUserPagination(params),
  });
};

export const useCreateDataUser = (): UseMutationResult<
  TGetUserDataResponse,
  TMetaErrorResponse,
  TRegisterRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["create-data-user"],
    mutationFn: async (payload) => await CreateDataUser(payload),
  });
};

export const useUpdateDataUsers = (): UseMutationResult<
  TGetUserDataResponse,
  TMetaErrorResponse,
  TUpdateDataAkun,
  unknown
> => {
  return useMutation({
    mutationKey: ["update-data-user"],
    mutationFn: async (payload) => await UpdateDataUser(payload),
  });
};

export const useDeleteAction = (): UseMutationResult<
  TGetUserDataResponse,
  TMetaErrorResponse,
  string,
  unknown
> =>
  useMutation({
    mutationKey: ["delete-user"],
    mutationFn: async (id) => await DeleteDataUser(id),
  });

export const useFilterAction = () => {
  const [get, set] = useRecoilState(filterActionUser);
  return {
    getFilterAction: get,
    setFilterAction: (params: TDataAkun) => set(params),
  };
};

export const useGetUserRoles = (): UseQueryResult<TUserRoles, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["get-user-roles"],
    queryFn: async () => await GetUserRole(),
  });
};

export const useDeleteDataUsers = (): UseMutationResult<
  TGetUserDataResponse,
  TMetaErrorResponse,
  string,
  unknown
> =>
  useMutation({
    mutationKey: ["delete-user"],
    mutationFn: async (id) => await DeleteDataUser(id),
  });
