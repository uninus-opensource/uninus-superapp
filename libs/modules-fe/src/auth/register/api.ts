import { api } from '@uninus/services-fe';
import { TRegisterResponse, TRegisterRequest } from '@uninus/entities';

export const registerRequest = async (
  payload: TRegisterRequest
): Promise<TRegisterResponse> => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};
