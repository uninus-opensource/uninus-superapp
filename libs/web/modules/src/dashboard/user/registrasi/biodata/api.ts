import { api } from "@uninus/web/services";
import {
  IUpdateStudentRequestFE,
  IUpdateStudentResponse,
  IGetStudentResponse,
  IGetUserMeResponse,
  IUpdateStudentGradeRequest,
  IUpdateStudentGradeResponse,
} from "@uninus/entities";

export const BiodataUpdate = async (
  payload: IUpdateStudentRequestFE,
): Promise<IUpdateStudentResponse> => {
  const { data } = await api.patch<IUpdateStudentRequestFE>("/student", payload);
  return data;
};

export const BiodatatGet = async (): Promise<IGetStudentResponse> => {
  const { data } = await api.get<IGetStudentResponse>("/student");
  return data;
};

export const StudentGet = async (): Promise<IGetUserMeResponse> => {
  const { data } = await api.get<IGetUserMeResponse>("/user/me");
  return data;
};

export const UpdateAverage = async (
  payload: IUpdateStudentGradeRequest,
): Promise<IUpdateStudentGradeResponse> => {
  const { data } = await api.patch<IUpdateStudentGradeRequest>("/student", payload);
  return data;
};
export const StudentGradeGet = async (): Promise<IUpdateStudentGradeResponse> => {
  const { data } = await api.get<IUpdateStudentGradeResponse>("/student");
  return data;
};
