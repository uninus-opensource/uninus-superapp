import { TQuestionResponse } from "@uninus/entities";
import { api } from "@uninus/web/services";
export const getQuestions = async (): Promise<TQuestionResponse[]> => {
  const { data } = await api.get<TQuestionResponse[]>("/questions");
  return data;
};
