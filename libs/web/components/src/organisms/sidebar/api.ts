import { api } from "@uninus/web/services";
import { IGetUserMeResponse } from "@uninus/entities";

export const StudentGet = async (): Promise<IGetUserMeResponse> => {
  const { data } = await api.get<IGetUserMeResponse>("/user/me");
  return data;
};
