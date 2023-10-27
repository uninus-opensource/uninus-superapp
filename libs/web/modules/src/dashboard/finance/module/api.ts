import { api, mock } from "@uninus/web/services";
import { TSummaryData } from "./type";

export const GerPaymentSummaryDataMock = async (): Promise<TSummaryData> => {
  const { data } = await mock.get("/payment-summary");

  return data;
};
export const GerPaymentSummaryDataApi = async (): Promise<TSummaryData> => {
  const { data } = await api.get<TSummaryData>("/payment-summary");

  return data;
};
