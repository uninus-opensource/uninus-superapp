import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { TPayLoadReset, TResetResponse } from "./type";
import { TMetaErrorResponse } from "@uninus/entities";
import { resetRequest } from "./api";

export const useReset = (): UseMutationResult<
  TResetResponse,
  TMetaErrorResponse,
  TPayLoadReset,
  unknown
> => {
  return useMutation({
    mutationKey: ["reset"],
    mutationFn: async (params) => await resetRequest(params),
  });
};
