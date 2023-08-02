import { api } from "@uninus/web/services";
import { TPayLoadReset, TResetResponse } from "./type";

export const resetRequest = async (payload: TPayLoadReset): Promise<TResetResponse> => {
  const { data } = await api.post("/auth/reset-password", payload);
  return data;
};
