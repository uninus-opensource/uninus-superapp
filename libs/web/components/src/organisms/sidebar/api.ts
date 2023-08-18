import { api } from "@uninus/web/services";
import { IGetStudentResponse } from "@uninus/entities";

export const StudentGet = async (): Promise<IGetStudentResponse> => {
  const { data } = await api.get<IGetStudentResponse>("/user/me");
  return data;
};
