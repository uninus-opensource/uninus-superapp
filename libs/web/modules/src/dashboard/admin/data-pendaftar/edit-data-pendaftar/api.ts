import { IGetStudentResponse } from "@uninus/entities";
import { api } from "@uninus/web/services";

export const getStudentById = async (id: string): Promise<IGetStudentResponse> => {
  const { data } = await api.get<IGetStudentResponse>(`/students/${id}`);
  return data;
};
