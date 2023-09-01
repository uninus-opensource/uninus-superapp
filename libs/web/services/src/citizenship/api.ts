import {
  ICitizenshipRequest,
  TCitizenshipResponse,
  ICountryRequest,
  TCountryResponse,
} from "@uninus/entities";
import { api } from "../axios";

export const CitizeGet = async (params: ICitizenshipRequest): Promise<TCitizenshipResponse> => {
  const { data } = await api<TCitizenshipResponse>({
    method: "GET",
    params,
    url: "/citizenship",
  });
  return data;
};

export const CountryGet = async (params: ICountryRequest): Promise<TCountryResponse> => {
  const { data } = await api<TCountryResponse>({
    method: "GET",
    params,
    url: "/country",
  });
  return data;
};
