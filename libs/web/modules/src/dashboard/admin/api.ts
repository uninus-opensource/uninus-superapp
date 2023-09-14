import { TTotalRegistransResponse } from "@uninus/entities";
import { api } from "@uninus/web/services";

export const RegistransGet = async (): Promise<TTotalRegistransResponse> => {
  const { data } = await api.get<TTotalRegistransResponse>("/registrans");
  return data;
};
