import { TInterestEducationPrograms, TTotalRegistransResponse } from "@uninus/entities";
import { api } from "@uninus/web/services";

export const RegistransGet = async (): Promise<TTotalRegistransResponse> => {
  const { data } = await api.get<TTotalRegistransResponse>("/registrans");
  return data;
};

export const PopularProgramsGet = async (): Promise<TInterestEducationPrograms> => {
  const { data } = await api.get<TInterestEducationPrograms>("/interest-programs");
  return data;
};
