import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  ICitizenshipRequest,
  TCitizenshipResponse,
  TMetaErrorResponse,
  ICountryRequest,
  TCountryResponse,
} from "@uninus/entities";
import { CitizeGet, CountryGet } from "./api";

export const useCitizenGet = (
  params: ICitizenshipRequest,
): UseQueryResult<TCitizenshipResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["geCitizen", params],
    queryFn: async () => await CitizeGet(params),
    keepPreviousData: true,
  });
};

export const useCountryGet = (
  params: ICountryRequest,
): UseQueryResult<TCountryResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getCountry", params],
    queryFn: async () => await CountryGet(params),
    keepPreviousData: true,
  });
};
