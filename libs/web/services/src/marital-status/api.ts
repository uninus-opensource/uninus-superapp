import { IMaritalStatusRequest, TMaritalStatusResponse } from "@uninus/entities";
import { api } from "../axios";

export const StatusGet = async (params: IMaritalStatusRequest): Promise<TMaritalStatusResponse> => {
  const { data } = await api<TMaritalStatusResponse>({
    method: "GET",
    params,
    url: "/marital-status",
  });
  return data;
};
