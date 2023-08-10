import { api } from "@uninus/web/services";
import {
  TReligionResponse,
  IReligionRequest,
  TMaritalStatusResponse,
  IMaritalStatusRequest,
  TDisabilitiesResponse,
  IDisabilitiesRequest,
  IGenderRequest,
  TGenderResponse,
  TCitizenshipResponse,
  ICitizenshipRequest,
  ICountryRequest,
  TCountryResponse,
} from "@uninus/entities";

export const ReligionGet = async (params: IReligionRequest): Promise<TReligionResponse> => {
  const { data } = await api<TReligionResponse>({
    method: "GET",
    params,
    url: "/religion",
  });
  return data;
};

export const StatusGet = async (params: IMaritalStatusRequest): Promise<TMaritalStatusResponse> => {
  const { data } = await api<TMaritalStatusResponse>({
    method: "GET",
    params,
    url: "/marital-status",
  });
  return data;
};

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

export const GenderGet = async (params: IGenderRequest): Promise<TGenderResponse> => {
  const { data } = await api<TGenderResponse>({
    method: "GET",
    params,
    url: "/gender",
  });
  return data;
};

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
