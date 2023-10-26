import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import {
  TCreateQuestionRequest,
  TDeleteQuestionResponse,
  TMetaErrorResponse,
  TQuestionResponse,
  TUpdateQuestionRequest,
} from "@uninus/entities";
import { createQuestion, deleteQuestion, questionGet, updateQuestion } from "./api";

export const useGetQuestion = (): UseQueryResult<TQuestionResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["question"],
    queryFn: async () => await questionGet(),
    keepPreviousData: true,
  });
};
export const useQuestionCreate = (): UseMutationResult<
  TQuestionResponse,
  TMetaErrorResponse,
  TCreateQuestionRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["create-question"],
    mutationFn: async (payload) => await createQuestion(payload),
  });
};
export const useQuestionDelete = (): UseMutationResult<
  TDeleteQuestionResponse,
  TMetaErrorResponse,
  number,
  unknown
> => {
  return useMutation({
    mutationKey: ["delete-question"],
    mutationFn: async (id) => await deleteQuestion(id),
  });
};
export const useQuestionUpdate = (): UseMutationResult<
  TQuestionResponse,
  TMetaErrorResponse,
  TUpdateQuestionRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["update-question"],
    mutationFn: async (payload) => await updateQuestion(payload),
  });
};
