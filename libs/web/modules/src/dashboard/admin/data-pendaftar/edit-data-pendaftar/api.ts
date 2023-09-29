import {
  IGetStudentResponse,
  IUpdateStudentRequest,
  IUpdateStudentResponse,
} from "@uninus/entities";
import { api } from "@uninus/web/services";

export const getStudentById = async (id: string): Promise<IGetStudentResponse> => {
  const { data } = await api.get<IGetStudentResponse>(`/student/${id}`);
  return data;
};

export const updateBiodataById = async (
  payload: IUpdateStudentRequest,
  id: string,
): Promise<IUpdateStudentResponse> => {
  const { data } = await api.patch<IUpdateStudentRequest>(`/student/${id}`, payload);
  return data;
};
