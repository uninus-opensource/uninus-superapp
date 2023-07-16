import { api } from '@uninus/services-fe';
import {
  IBiodataGetResponse,
  TBiodataRequest,
  TBiodataResponse,
} from '@uninus/entities';

export const BiodataCreate = async (
  payload: TBiodataRequest
): Promise<TBiodataResponse> => {
  const { data } = await api.post('/student', payload);
  return data;
};

export const BiodataUpdate = async (
  payload: TBiodataRequest
): Promise<TBiodataResponse> => {
  const { data } = await api.put('/student', payload);
  return data;
};

export const BiodataGet = async (): Promise<IBiodataGetResponse> => {
  const { data } = await api.get<IBiodataGetResponse>('/student');
  return data;
};
