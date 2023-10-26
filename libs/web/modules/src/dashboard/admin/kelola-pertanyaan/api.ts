import {
  TCreateQuestionRequest,
  TDeleteQuestionResponse,
  TQuestionResponse,
  TUpdateQuestionRequest,
} from "@uninus/entities";
import { api } from "@uninus/web/services";

export const questionGet = async (): Promise<TQuestionResponse> => {
  const { data } = await api.get<TQuestionResponse>("/questions");
  return data;
};
export const createQuestion = async (
  payload: TCreateQuestionRequest,
): Promise<TQuestionResponse> => {
  const { data } = await api({
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    url: `/create-question`,
    data: payload,
  });
  return data;
};
export const deleteQuestion = async (id: number): Promise<TDeleteQuestionResponse> => {
  const { data } = await api({
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    url: `/delete-question/${id}`,
  });
  return data;
};
export const updateQuestion = async (
  payload: TUpdateQuestionRequest,
): Promise<TQuestionResponse> => {
  const { data } = await api({
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    url: `/update-question/${payload.id}`,
    data: payload,
  });
  return data;
};
