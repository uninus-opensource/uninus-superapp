import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { TPayloadVerifyOTP, TVerifyOTPResponse, TNewOtpRequest } from "./type";
import { TMetaErrorResponse } from "@uninus/entities";
import { verifyRequest, requestNewOtp } from "./api";

export const useVerify = (): UseMutationResult<
  TVerifyOTPResponse,
  TMetaErrorResponse,
  TPayloadVerifyOTP,
  unknown
> => {
  return useMutation({
    mutationKey: ["verify"],
    mutationFn: async (params) => await verifyRequest(params),
  });
};

export const useNewOtpRequest = (): UseMutationResult<
  TVerifyOTPResponse,
  TMetaErrorResponse,
  TNewOtpRequest
> => {
  return useMutation({
    mutationKey: ["newRequestOtp"],
    mutationFn: async (params) => await requestNewOtp(params),
  });
};
