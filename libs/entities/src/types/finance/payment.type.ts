import { TVSCreatePayment, TVSStatusPayment } from "../../schemas";

export type TCreatePaymentRequest = {
  userId?: string;
} & TVSCreatePayment;

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
  userId?: string;
} & TVSStatusPayment;

export type TStatusPaymentResponse =
  | {
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
    }
  | {
      message: string;
    };

export type TPaymentCallbackRequest = {
  amount: number;
  bankName: string;
  issuer: string;
  issuerRefNo: string;
  responseCode: string;
  responseDescription: string;
  transactionType: number;
  trxRef: string;
  userId: string;
};

export type TPaymentCallbackResponse = {
  responseCode: string;
  responseDescription: string;
};

export type TPaymentCallbackHeaders = {
  timestamp: string;
  signature: string;
  authorization: string;
};
