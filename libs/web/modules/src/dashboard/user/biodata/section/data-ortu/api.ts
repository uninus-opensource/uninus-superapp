import { api } from "@uninus/web/services";
import { TSalaryResponse, ISalaryRequest } from "@uninus/entities";

export const SalaryGet = async (params: ISalaryRequest): Promise<TSalaryResponse> => {
  const { data } = await api<TSalaryResponse>({
    method: "GET",
    params,
    url: "/salary",
  });
  return data;
};
