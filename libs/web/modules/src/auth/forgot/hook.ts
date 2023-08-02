import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { TPayLoadForgot, TForgotResponse } from "./type";
import { TMetaErrorResponse } from "@uninus/entities";
import { forgotRequest } from "./api";

export const useForgot = (): UseMutationResult<
  TForgotResponse,
  TMetaErrorResponse,
  TPayLoadForgot,
  unknown
> => {
  return useMutation({
    mutationKey: ["forgot"],
    mutationFn: async (params) => await forgotRequest(params),
  });
};
