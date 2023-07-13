import { api } from '@uninus/services-fe';
import { TPayLoadForgot, TForgotResponse } from './type';

export const forgotRequest = async (
  payload: TPayLoadForgot
): Promise<TForgotResponse> => {
  const { data } = await api.post('/auth/forgot-password', payload);
  return data;
};
