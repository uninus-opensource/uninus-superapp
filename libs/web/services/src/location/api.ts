import { api } from "../axios";
import {
  TProvinceResponse,
  IProvinceRequest,
  ICityRequest,
  TCityResponse,
  ISubDistrictRequest,
  TSubDistrictResponse,
} from "@uninus/entities";

export const ProvinceGet = async (params: IProvinceRequest): Promise<TProvinceResponse> => {
  const { data } = await api<TProvinceResponse>({
    method: "GET",
    params,
    url: "/province",
  });
  return data;
};

export const CityGet = async (params: ICityRequest): Promise<TCityResponse> => {
  const { data } = await api<TCityResponse>({
    method: "GET",
    params,
    url: "/city",
  });
  return data;
};

export const SubDistrictGet = async (
  params: ISubDistrictRequest,
): Promise<TSubDistrictResponse> => {
  const { data } = await api<TSubDistrictResponse>({
    method: "GET",
    params,
    url: "/subdistrict",
  });
  return data;
};
