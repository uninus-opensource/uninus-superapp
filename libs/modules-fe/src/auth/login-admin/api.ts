import { api } from '@uninus/services-fe';
import { TLoginResponse, TLoginRequest } from '@uninus/entities';

export const loginRequestAdmin = async (
  payload: TLoginRequest
): Promise<TLoginResponse> => {
  const { data } = await api.post('/auth/login', payload);
  return data;
};
