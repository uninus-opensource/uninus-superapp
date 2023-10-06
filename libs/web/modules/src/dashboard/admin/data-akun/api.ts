import {
  TCreateUserRequest,
  TGetUserDataResponse,
  TMetaErrorResponse,
  TUsersPaginatonResponse,
} from "@uninus/entities";
import { api } from "@uninus/web/services";
import { TUpdateDataAkun, TUserRoles } from "./types";
import { TUsersPaginationParams } from "../type";
import { UseMutationResult, useMutation } from "@tanstack/react-query";

export const GetDataUserPagination = async (
  params: TUsersPaginationParams,
): Promise<TUsersPaginatonResponse> => {
  const { data } = await api<TUsersPaginatonResponse>({
    method: "GET",
    url: "/user",
    params,
  });
  return data;
};

export const CreateDataUser = async (
  payload: TCreateUserRequest,
): Promise<TGetUserDataResponse> => {
  const { data } = await api({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    url: `/user`,
    data: payload,
  });
  return data;
};

export const UpdateDataUser = async (payload: TUpdateDataAkun): Promise<TGetUserDataResponse> => {
  const { data } = await api({
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    url: `/user/${payload.id}`,
    data: payload,
  });
  return data;
};

export const DeleteDataUser = async (id: string): Promise<TGetUserDataResponse> => {
  const { data } = await api({
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    url: `/user/${id}`,
  });
  return data;
};
export const GetUserRole = async (): Promise<TUserRoles> => {
  const { data } = await api<TUserRoles>({
    headers: {
      "Content-Type": "application/json",
    },
    url: "/roles",
  });
  return data;
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
