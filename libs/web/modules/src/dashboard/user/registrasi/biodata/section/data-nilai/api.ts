import { IUpdateStudentGradeRequest, IUpdateStudentGradeResponse } from "@uninus/entities";
import { api } from "@uninus/web/services";

export const UpdateAverage = async (
  payload: IUpdateStudentGradeRequest,
): Promise<IUpdateStudentGradeResponse> => {
  const { data } = await api.put<IUpdateStudentGradeRequest>("/student", payload);
  return data;
};
export const StudentGradeGet = async (): Promise<IUpdateStudentGradeResponse> => {
  const { data } = await api.get<IUpdateStudentGradeResponse>("/student");
  return data;
};
