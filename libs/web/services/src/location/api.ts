import { api } from '../axios';
import {
  TProvinceResponse,
  IProvinceRequest,
  ICityRequest,
  TCityResponse,
  ISubDistrictRequest,
  TSubDistrictResponse,
} from '@uninus/entities';

export const ProvinceGet = async (
  params: IProvinceRequest
): Promise<TProvinceResponse> => {
  const { data } = await api<TProvinceResponse>({
    method: 'GET',
    params,
    url: '/location/province',
  });
  return data;
};

export const CityGet = async (params: ICityRequest): Promise<TCityResponse> => {
  const { data } = await api<TCityResponse>({
    method: 'GET',
    params,
    url: '/location/city',
  });
  return data;
};

export const SubDistrictGet = async (
  params: ISubDistrictRequest
): Promise<TSubDistrictResponse> => {
  const { data } = await api<TSubDistrictResponse>({
    method: 'GET',
    params,
    url: '/location/sub-district',
  });
  return data;
};
