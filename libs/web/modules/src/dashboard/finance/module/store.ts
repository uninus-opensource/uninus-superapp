import { atom } from "recoil";
import { TSummaryData } from "./type";

export const paymentSummaryData = [
  {
    id: "1",
    fakultas: "FTEK",
    totalMahasiswa: 300,
    alreadyPayed: 5000000,
    remainingPayment: 7000000,
  },
  {
    id: "2",
    fakultas: "FKIP",
    totalMahasiswa: 200,
    alreadyPayed: 4000000,
    remainingPayment: 5000000,
  },
  {
    id: "3",
    fakultas: "FKOM",
    totalMahasiswa: 260,
    alreadyPayed: 5000000,
    remainingPayment: 8000000,
  },
  {
    id: "4",
    fakultas: "FKON",
    totalMahasiswa: 150,
    alreadyPayed: 6000000,
    remainingPayment: 7000000,
  },
  {
    id: "5",
    fakultas: "FKON",
    totalMahasiswa: 150,
    alreadyPayed: 6000000,
    remainingPayment: 7000000,
  },
  {
    id: "6",
    fakultas: "FKON",
    totalMahasiswa: 150,
    alreadyPayed: 6000000,
    remainingPayment: 7000000,
  },
  {
    id: "7",
    fakultas: "FKON",
    totalMahasiswa: 150,
    alreadyPayed: 6000000,
    remainingPayment: 7000000,
  },

  {
    id: "8",
    fakultas: "FKON",
    totalMahasiswa: 150,
    alreadyPayed: 6000000,
    remainingPayment: 7000000,
  },
  {
    id: "9",
    fakultas: "FKON",
    totalMahasiswa: 150,
    alreadyPayed: 6000000,
    remainingPayment: 7000000,
  },
];

export const paymentSummary = atom({
  key: "paymentSummary",
  default: [] as unknown as TSummaryData | undefined,
});
