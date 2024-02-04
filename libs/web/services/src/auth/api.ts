import { TLoginRequest, TLoginResponse, TUser } from "@uninus/entities";
import { api } from "..";
import { isAxiosError } from "axios";

export const postUserLogin = async (payload: TLoginRequest): Promise<TLoginResponse> => {
  try {
    const { data } = await api<TLoginResponse>({
      method: "POST",
      url: "/auth/login",
      data: payload,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error("Terjadi Kesalahan di server");
    }
  }
};

export const getUserById = async (id: string): Promise<TUser> => {
  try {
    const { data } = await api.get<TUser>(`/user/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error?.response?.status === 422) {
        console.log(error.response.data?.message);
        throw new Error(error.response.data.message);
      }

      throw new Error(
        typeof error?.response?.data === "string"
          ? error.response.data
          : error?.response?.data?.message,
      );
    } else {
      throw new Error("Something went wrong");
    }
  }
};
