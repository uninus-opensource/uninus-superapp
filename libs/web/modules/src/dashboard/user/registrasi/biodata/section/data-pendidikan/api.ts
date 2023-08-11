import { api } from "@uninus/web/services";
import { TYearGraduationResponse, IYearGraduationRequest } from "@uninus/entities";

export const YearGraduationGet = async (
  params: IYearGraduationRequest,
): Promise<TYearGraduationResponse> => {
  const { data } = await api<TYearGraduationResponse>({
    method: "GET",
    params,
    url: "/year-graduate",
  });
  return data;
};
