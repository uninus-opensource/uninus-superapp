export type TPaymentObligationsRequest = {
  search?: string;
  userId?: string;
};
export type TPaymentObligationsResponse = Array<{
  id?: number;
  name?: string;
  amount?: number;
  spelled_out?: string;
}>;
