import { api } from "@uninus/web/services";
import { TPayloadVerifyOTP, TVerifyOTPResponse, TNewOtpRequest } from "./type";

export const verifyRequest = async (payload: TPayloadVerifyOTP): Promise<TVerifyOTPResponse> => {
  const { data } = await api.post("/auth/otp/verify", payload);
  return data;
};

export const requestNewOtp = async (payload: TNewOtpRequest): Promise<TVerifyOTPResponse> => {
  const { data } = await api.post("/auth/otp/resend", payload);
  return data;
};
