import { atom } from "recoil";
import { TSummaryData } from "./type";

export const paymentSummary = atom({
  key: "paymentSummary",
  default: [] as unknown as TSummaryData | undefined,
});
