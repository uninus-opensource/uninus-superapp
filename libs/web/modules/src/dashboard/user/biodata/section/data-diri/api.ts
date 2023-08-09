import { api } from "@uninus/web/services";
import {
  TReligionResponse,
  IReligionRequest,
  TMaritalStatusResponse,
  IMaritalStatusRequest,
  TDisabilitiesResponse,
  IDisabilitiesRequest,
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
