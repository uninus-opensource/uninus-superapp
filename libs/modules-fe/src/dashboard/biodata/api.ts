import { api } from '@uninus/services-fe';
import { TBiodataRequest, TBiodataResponse } from '@uninus/entities';

export const BiodataCreate = async (
  payload: TBiodataRequest
): Promise<TBiodataResponse> => {
  const { data } = await api.post('/student', payload);
  return data;
};
