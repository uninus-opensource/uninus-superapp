import { IGenderRequest, TGenderResponse } from "@uninus/entities";
import { api } from "../axios";

export const GenderGet = async (params: IGenderRequest): Promise<TGenderResponse> => {
  const { data } = await api<TGenderResponse>({
    method: "GET",
    params,
    url: "/gender",
  });
  return data;
};
