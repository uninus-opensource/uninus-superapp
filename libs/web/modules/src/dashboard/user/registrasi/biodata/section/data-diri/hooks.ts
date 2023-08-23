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
  IOccupationRequest,
  TOccupationResponse,
  TCountryResponse,
  IOccupationPositionRequest,
  TOccupationPositionResponse,
  ISalaryRequest,
  TSalaryResponse,
} from "@uninus/entities";
import {
  DisabilitiesGet,
  ReligionGet,
  StatusGet,
  GenderGet,
  CitizeGet,
  CountryGet,
  OccupationGet,
  OccupationPositionGet,
  SalaryGet,
} from "./api";

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
export const useOccupationGet = (
  params: IOccupationRequest,
): UseQueryResult<TOccupationResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getOccupation", params],
    queryFn: async () => await OccupationGet(params),
  });
};
export const useOccupationPositionGet = (
  params: IOccupationPositionRequest,
): UseQueryResult<TOccupationPositionResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getOccupationPosition", params],
    queryFn: async () => await OccupationPositionGet(params),
  });
};

export const useSalaryGet = (
  params: ISalaryRequest,
): UseQueryResult<TSalaryResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["getSalary", params],
    queryFn: async () => await SalaryGet(params),
  });
};
