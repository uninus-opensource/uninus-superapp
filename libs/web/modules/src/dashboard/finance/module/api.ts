import { api, mock } from "@uninus/web/services";
import { TFacultyPaymentDepositData, TSummaryData, TSummaryParams } from "./type";

export const GetPaymentSummaryDataMock = async (params: TSummaryParams): Promise<TSummaryData> => {
  const { data } = await mock<TSummaryData>({
    method: "GET",
    url: "/payment-summary",
    params,
  });
  return data;
};
export const GetFacultyPaymentDeposit = async (): Promise<TFacultyPaymentDepositData> => {
  const { data } = await mock.get<TFacultyPaymentDepositData>("/faculty-payment-deposit");
  return data;
};
export const GetPaymentSummaryDataApi = async (): Promise<TSummaryData> => {
  const { data } = await api.get<TSummaryData>("/payment-summary");

  return data;
};
