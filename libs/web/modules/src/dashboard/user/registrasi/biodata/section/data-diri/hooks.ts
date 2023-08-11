import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  TReligionResponse,
  IReligionRequest,
  TMaritalStatusResponse,
  IMaritalStatusRequest,
  TMetaErrorResponse,
  IDisabilitiesRequest,
  TDisabilitiesResponse,
  IGenderRequest,
  TGenderResponse,
  ICitizenshipRequest,
  TCitizenshipResponse,
  ICountryRequest,
  TCountryResponse,
} from "@uninus/entities";
import { DisabilitiesGet, ReligionGet, StatusGet, GenderGet, CitizeGet, CountryGet } from "./api";

export const useReligionGet = (
  params: IReligionRequest,
): UseQueryResult<TReligionResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getReligion", params],
    queryFn: async () => await ReligionGet(params),
  });
};

export const useStatusGet = (
  params: IMaritalStatusRequest,
): UseQueryResult<TMaritalStatusResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getStatus", params],
    queryFn: async () => await StatusGet(params),
  });
};

export const useDisabilitiesGet = (
  params: IDisabilitiesRequest,
): UseQueryResult<TDisabilitiesResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getDisabilities", params],
    queryFn: async () => await DisabilitiesGet(params),
  });
};

export const useGenderGet = (
  params: IGenderRequest,
): UseQueryResult<TGenderResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getGender", params],
    queryFn: async () => await GenderGet(params),
  });
};

export const useCitizenGet = (
  params: ICitizenshipRequest,
): UseQueryResult<TCitizenshipResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["geCitizen", params],
    queryFn: async () => await CitizeGet(params),
  });
};

export const useCountryGet = (
  params: ICountryRequest,
): UseQueryResult<TCountryResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getCountry", params],
    queryFn: async () => await CountryGet(params),
  });
};
