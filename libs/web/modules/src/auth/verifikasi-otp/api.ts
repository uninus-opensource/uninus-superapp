import { api } from '@uninus/web/services';
import { TPayloadVerify, TVerifyResponse, TNewOtpRequest } from './type';

export const verifyRequest = async (
  payload: TPayloadVerify
): Promise<TVerifyResponse> => {
  const { data } = await api.post('/auth/verify', payload);
  return data;
};

export const requestNewOtp = async (
  payload: TNewOtpRequest
): Promise<TVerifyResponse> => {
  const { data } = await api.post('/auth/resend-otp', payload);
  return data;
};
