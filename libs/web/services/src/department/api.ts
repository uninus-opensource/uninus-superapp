import { TDepartmentResponse } from "@uninus/entities";
import { api } from "../axios";

export const DepartmentGet = async (): Promise<TDepartmentResponse> => {
  const { data } = await api<TDepartmentResponse>({
    method: "GET",
    url: "/department",
  });
  return data;
};
