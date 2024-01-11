import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { logoutRequest } from "./api";
import { TMetaErrorResponse } from "@uninus/entities";
import { signOut } from "next-auth/react";

export const useLogout = (): UseMutationResult<
  unknown,
  TMetaErrorResponse,
  string | undefined,
  unknown
> => {
  return useMutation({
    mutationKey: ["logout-request"],
    mutationFn: async (params) => logoutRequest({ refreshToken: params }),
    onSuccess: async () => await signOut({ callbackUrl: "/auth/login" }),
  });
};

export const useLogoutToRoot = (): UseMutationResult<
  unknown,
  TMetaErrorResponse,
  string | undefined,
  unknown
> => {
  return useMutation({
    mutationKey: ["logout-request"],
    mutationFn: async (params) => logoutRequest({ refreshToken: params }),
    onSuccess: async () => await signOut({ callbackUrl: "/" }),
  });
};
