export type TFinanceSummaryRequest = {
  filter?: string;
  startDate?: string;
  endDate?: string;
};

export type TFinanceSummaryResponse = {
  data: Array<object>;
  summary: {
    totalStudent: number;
    additionsTotalStudent: number;
    studentWithScholarship: number;
    additionsStudentScholarship: number;
    paids: number;
    additionsPaids: number;
    installmentPayment: number;
    additionsInstallmentPayment: number;
    unpaids: number;
    additionsUnpaids: number;
  };
};
