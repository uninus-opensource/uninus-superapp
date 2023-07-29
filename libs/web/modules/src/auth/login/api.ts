import { api } from '@uninus/web/services';
import { TLoginResponse, TLoginRequest } from '@uninus/entities';

export const loginRequest = async (
  payload: TLoginRequest
): Promise<TLoginResponse> => {
  const { data } = await api.post('/auth/login', payload);
  return data;
};
