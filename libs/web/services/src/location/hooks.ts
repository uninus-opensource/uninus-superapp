import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  TProvinceResponse,
  IProvinceRequest,
  ICityRequest,
  TCityResponse,
  ISubDistrictRequest,
  TSubDistrictResponse,
  TMetaErrorResponse,
} from "@uninus/entities";
import { ProvinceGet, CityGet, SubDistrictGet } from "./api";

export const useProvinceGet = (
  params: IProvinceRequest,
): UseQueryResult<TProvinceResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getProvince", params],
    queryFn: async () => await ProvinceGet(params),
    keepPreviousData: true,
  });
};

export const useCityGet = (
  params: ICityRequest,
): UseQueryResult<TCityResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getCity", params],
    queryFn: async () => await CityGet(params),
    enabled: !!params,
    keepPreviousData: true,
  });
};

export const useSubdistrictGet = (
  params: ISubDistrictRequest,
): UseQueryResult<TSubDistrictResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getSubdistrict", params],
    queryFn: async () => await SubDistrictGet(params),
    enabled: !!params,
    keepPreviousData: true,
  });
};
