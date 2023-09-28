import {
  TGetUserDataResponse,
  TMetaErrorResponse,
  TRegisterRequest,
  TUser,
} from "@uninus/entities";
import { GetDataUser, CreateDataUser, UpdateDataUser, DeleteDataUser } from "./api";
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { TDataAkun } from "./types";
import { filterActionUser } from "./store";

export const useDataUsers = (
  params: TDataAkun,
): UseQueryResult<TGetUserDataResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["get-data-users", params],
    queryFn: async () => await GetDataUser(params),
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
  TUser,
  TMetaErrorResponse,
  TGetUserDataResponse,
  unknown
> => {
  return useMutation({
    mutationKey: ["update-data-user"],
    mutationFn: async (payload) => await UpdateDataUser(payload),
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

export const useFilterAction = () => {
  const [get, set] = useRecoilState(filterActionUser);
  return {
    getFilterAction: get,
    setFilterAction: (params: TDataAkun) => set(params),
  };
};
