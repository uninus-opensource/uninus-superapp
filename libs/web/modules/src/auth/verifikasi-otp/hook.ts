import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { TPayloadVerify, TVerifyResponse, TNewOtpRequest } from "./type";
import { TMetaErrorResponse } from "@uninus/entities";
import { verifyRequest, requestNewOtp } from "./api";

export const useVerify = (): UseMutationResult<
  TVerifyResponse,
  TMetaErrorResponse,
  TPayloadVerify,
  unknown
> => {
  return useMutation({
    mutationKey: ["verify"],
    mutationFn: async (params) => await verifyRequest(params),
  });
};

export const useNewOtpRequest = (): UseMutationResult<
  TVerifyResponse,
  TMetaErrorResponse,
  TNewOtpRequest
> => {
  return useMutation({
    mutationKey: ["newRequestOtp"],
    mutationFn: async (params) => await requestNewOtp(params),
  });
};
