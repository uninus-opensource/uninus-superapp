import { TDegreeProgramResponse } from "@uninus/entities";
import { api } from "../axios";

export const DegreeProgramtGet = async (): Promise<TDegreeProgramResponse> => {
  const { data } = await api<TDegreeProgramResponse>({
    method: "GET",
    url: "/degree-program",
  });
  return data;
};
