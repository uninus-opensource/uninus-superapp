import { api } from '@uninus/services-fe';
import { TPayloadVerifyOTP, TVerifyOTPResponse, TNewOtpRequest } from './type';

export const verifyRequest = async (
  payload: TPayloadVerifyOTP
): Promise<TVerifyOTPResponse> => {
  const { data } = await api.post('/auth/verify-otp-password', payload);
  return data;
};

export const requestNewOtp = async (
  payload: TNewOtpRequest
): Promise<TVerifyOTPResponse> => {
  const { data } = await api.post('/auth/resend-otp', payload);
  return data;
};
