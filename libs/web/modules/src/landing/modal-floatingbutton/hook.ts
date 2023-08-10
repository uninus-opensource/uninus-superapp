import { UseMutationResult, useMutation } from "@tanstack/react-query";
import {
  TGraduationStatusReponse,
  TGraduationStatusRequest,
  TMetaErrorResponse,
} from "@uninus/entities";
import { CheckRegistration } from "./api";

export const useCheckRegistration = (): UseMutationResult<
  TGraduationStatusReponse,
  TMetaErrorResponse,
  TGraduationStatusRequest
> =>
  useMutation({
    mutationKey: ["checkRegistration"],
    mutationFn: async (payload: TGraduationStatusRequest) => {
      return await CheckRegistration(payload);
    },
  });
