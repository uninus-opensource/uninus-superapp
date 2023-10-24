export type TFinanceSummaryRequest = {
  filter?: string;
  start_date?: string;
  end_date?: string;
};

export type TFinanceSummaryResponse = {
  data: Array<object>;
  summary: {
    total_student: number;
    additions_total_student: number;
    student_with_scholarship: number;
    additions_student_scholarship: number;
    paids: number;
    additions_paids: number;
    installment_payment: number;
    additions_installment_payment: number;
    unpaids: number;
    additions_unpaids: number;
  };
};
