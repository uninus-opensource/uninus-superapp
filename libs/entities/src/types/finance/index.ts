<<<<<<< HEAD
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
=======
>>>>>>> 4aeb9d1e (improvement: setup integration payment)
export type TCreatePaymentRequest = {
  email: string;
  fullname: string;
  phone_number: string;
  amount: number;
  orderId: string;
};

export type TCreatePaymentResponse = {
  responseAuth: {
    signature: string;
  };
  responseData: {
    statusCode: string;
    statusMessage: string;
    orderId: string;
    endpointUrl: string;
  };
};

export type TStatusPaymentRequest = {
  orderId: string;
};

export type TStatusPaymentResponse = {
  responseCode: string;
  responseDesc: string;
  trxRef: string;
  issuer: string;
  issuerRefNo: string;
  ottoRefNo: string;
  transactionStatusCode: string;
  transactionStatusDesc: string;
  amount: number;
  transactionTime: string;
  customerId: string;
  refundHistory: Array<string>;
  vaBank: string;
  vaNumber: string;
  paymentMethod: string;
};
