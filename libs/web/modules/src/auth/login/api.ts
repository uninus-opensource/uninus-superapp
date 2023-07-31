import { api } from '@uninus/web/services';
import {
  TLoginResponse,
  TLoginRequest,
  TResRefreshToken,
} from '@uninus/entities';

export const loginRequest = async (
  payload: TLoginRequest
): Promise<TLoginResponse> => {
  const { data } = await api.post('/auth/login', payload);
  return data;
};

export const refreshRequest = async (payload: {
  refresh_token: string;
}): Promise<TResRefreshToken> => {
  const { data } = await api.post('/auth/refresh', payload);
  return data;
};
