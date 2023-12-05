import { TScholarshipResponse } from "@uninus/entities";
import { api } from "../axios";

export const ScholarshipGet = async (): Promise<TScholarshipResponse> => {
  const { data } = await api<TScholarshipResponse>({
    method: "GET",
    url: "/scholarship",
  });
  return data;
};
