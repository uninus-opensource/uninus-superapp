import { TGetUserDataResponse, TRegisterRequest, TUser } from "@uninus/entities";
import { api } from "@uninus/web/services";
import { TDataAkun } from "./types";

export const GetDataUser = async (params: TDataAkun): Promise<TGetUserDataResponse> => {
  const { data } = await api<TGetUserDataResponse>({
    headers: {
      "Content-Type": "application/json",
    },
    url: "/user",
    params,
  });
  return data;
};

export const CreateDataUser = async (payload: TRegisterRequest): Promise<TGetUserDataResponse> => {
  const { data } = await api({
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: `/user`,
    data: payload,
  });
  return data;
};

export const UpdateDataUser = async (id: TGetUserDataResponse): Promise<TUser> => {
  const { data } = await api({
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: `/user/${id}`,
    data: id,
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
