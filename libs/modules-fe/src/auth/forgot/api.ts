import { api } from '@uninus/services-fe';
import { TForgotRequest, TForgotResponse } from '@uninus/entities';

export const forgotRequest = async (
  payload: TForgotRequest
): Promise<TForgotResponse> => {
  const { data } = await api.post('/auth/forgot-password', payload);
  return data;
};
