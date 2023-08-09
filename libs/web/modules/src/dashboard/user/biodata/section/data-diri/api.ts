import { api } from "@uninus/web/services";
import { TReligionResponse, IReligionRequest } from "@uninus/entities";

export const ReligionGet = async (params: IReligionRequest): Promise<TReligionResponse> => {
  const { data } = await api<TReligionResponse>({
    method: "GET",
    params,
    url: "/province",
  });
  return data;
};
