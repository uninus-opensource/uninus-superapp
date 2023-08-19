import { api } from "@uninus/web/services";
import {
  IUpdateStudentRequestFE,
  IUpdateStudentResponse,
  IGetStudentResponse,
} from "@uninus/entities";

export const BiodataUpdate = async (
  payload: IUpdateStudentRequestFE,
): Promise<IUpdateStudentResponse> => {
  const { data } = await api.put<IUpdateStudentRequestFE>("/student", payload);
  return data;
};

export const BiodatatGet = async (): Promise<IGetStudentResponse> => {
  const { data } = await api.get<IGetStudentResponse>("/student");
  return data;
};
