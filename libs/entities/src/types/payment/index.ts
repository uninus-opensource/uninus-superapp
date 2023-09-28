export type TPaymentRequest = {
  phone_number: string;
  bank_code: string;
  fullname: string;
};

export type TPaymentResponse = {
  id?: string;
  owner_id?: string;
  external_id?: string;
  account_number?: string;
  bank_code?: string;
  merchant_code?: string;
  name?: string;
  is_closed?: boolean;
  expected_amount?: number;
  expiration_date?: string;
  is_single_use?: boolean;
  status?: string;
  currency?: string;
  country?: string;
};
