import { IDisabilitiesRequest, TDisabilitiesResponse } from "@uninus/entities";
import { api } from "../axios";

export const DisabilitiesGet = async (
  params: IDisabilitiesRequest,
): Promise<TDisabilitiesResponse> => {
  const { data } = await api<TDisabilitiesResponse>({
    method: "GET",
    params,
    url: "/disabilities",
  });
  return data;
};
