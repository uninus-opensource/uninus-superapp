import { api } from "@uninus/web/services";
import { TLoginResponse, TLoginRequest, TResRefreshToken } from "@uninus/entities";

export const loginRequest = async (payload: TLoginRequest): Promise<TLoginResponse> => {
  const { data } = await api.post(`/auth/login`, payload, {
    headers: {
      "Content-Type": "application/json",
      "app-origin": process.env.NEXT_PUBLIC_APP_ORIGIN,
    },
  });
  return data;
};

export const refreshRequest = async (payload: {
  refreshToken: string;
}): Promise<TResRefreshToken> => {
  const { data } = await api.post("/auth/refresh", payload);
  return data;
};
