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
