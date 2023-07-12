import { api } from '@uninus/services-fe';
import { TPayloadVerify, TVerifyResponse } from './type';

export const verifyRequest = async (
  payload: TPayloadVerify
): Promise<TVerifyResponse> => {
  const { data } = await api.post('/auth/verify', payload);
  return data;
};
