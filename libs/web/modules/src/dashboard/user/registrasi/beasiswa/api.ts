import { api } from "@uninus/web/services";
import {
  TScholarshipResponse,
  IScholarshipRequest,
  IGetStudentResponse,
  IUpdateStudentRequestFE,
} from "@uninus/entities";

export const ScholarshipGet = async (
  params: IScholarshipRequest,
): Promise<TScholarshipResponse> => {
  const { data } = await api<TScholarshipResponse>({
    method: "GET",
    params,
    url: "/scholarship",
  });
  return data;
};
export const BiodataUpdate = async (
  payload: IUpdateStudentRequestFE,
): Promise<IUpdateStudentRequestFE> => {
  const { data } = await api.patch<IUpdateStudentRequestFE>("/student", payload);
  return data;
};
