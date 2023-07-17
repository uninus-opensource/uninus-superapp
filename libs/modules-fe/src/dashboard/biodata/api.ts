import { api } from '@uninus/services-fe';
import {
  IBiodataGetResponse,
  TBiodataRequest,
  TBiodataResponse,
  TBiodataUpdateRequest,
  TBiodataUpdateResponse,
} from '@uninus/entities';

export const BiodataCreate = async (
  payload: TBiodataRequest | unknown
): Promise<TBiodataResponse> => {
  const { data } = await api.post('/student', payload);
  return data;
};

export const BiodataUpdate = async (
  payload: TBiodataUpdateRequest | unknown
): Promise<TBiodataUpdateResponse> => {
  const { data } = await api.put('/student', payload);
  return data;
};

export const BiodataGet = async (): Promise<IBiodataGetResponse> => {
  const { data } = await api.get<IBiodataGetResponse>('/student');
  return data;
};
