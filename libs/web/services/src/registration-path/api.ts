import { TRegistrationPathResponse } from "@uninus/entities";
import { api } from "../axios";

export const RegistrationPathGet = async (): Promise<TRegistrationPathResponse> => {
  const { data } = await api<TRegistrationPathResponse>({
    method: "GET",
    url: "/registration-path",
  });
  return data;
};
