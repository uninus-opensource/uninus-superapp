import { IReligionRequest, TReligionResponse } from "@uninus/entities";
import { api } from "../axios";

export const ReligionGet = async (params: IReligionRequest): Promise<TReligionResponse> => {
  const { data } = await api<TReligionResponse>({
    method: "GET",
    params,
    url: "/religion",
  });
  return data;
};
