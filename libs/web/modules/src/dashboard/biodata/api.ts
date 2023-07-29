import { api } from '@uninus/web/services';
import {
  IBiodataGetResponse,
  TBiodataRequest,
  TBiodataResponse,
  TBiodataUpdateRequest,
  TBiodataUpdateResponse,
} from '@uninus/entities';

export const BiodataCreate = async (
  payload: TBiodataRequest
): Promise<TBiodataResponse> => {
  const { data } = await api.post<TBiodataRequest>('/student', payload);
  return data;
};

export const BiodataUpdate = async (
  payload: TBiodataUpdateRequest
): Promise<TBiodataUpdateResponse> => {
  const { data } = await api.put<TBiodataUpdateRequest>('/student', payload);
  return data;
};

export const BiodataGet = async (): Promise<IBiodataGetResponse> => {
  const { data } = await api.get<IBiodataGetResponse>('/student');
  return data;
};
