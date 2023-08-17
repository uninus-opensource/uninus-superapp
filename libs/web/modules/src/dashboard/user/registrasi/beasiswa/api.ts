import { api } from "@uninus/web/services";
import { TScholarshipResponse, IScholarshipRequest } from "@uninus/entities";

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
