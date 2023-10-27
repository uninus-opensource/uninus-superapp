import { ReactNode } from "react";

export type TDataCard = {
  icon?: ReactNode;
  desc?: string;
  jumlah?: number;
  update_data?: string;
  background?: string;
  tcolor?: string;
};
export type TPaymentSummary = {
  id?: string;
  fakultas?: string;
  totalMahasiswa?: number;
  alreadyPayed?: number;
  remainingPayment?: number;
};

export type TSummaryData = {
  data: Array<{
    label: string;
    total_student: number;
    paid: number;
    unpaid: number;
    installment_payment: number;
  }>;
  summary: {
    total_student: number;
    student_with_scholarship: number;
    additions_student_scholarship: number;
    paids: number;
    additions_paids: number;
    installment_payment: number;
    additons_installment_payment: number;
    undone_payment: number;
    additions_undone_payment: number;
  };
};
