export type TPaymentObligationsRequest = {
  search?: string;
  userId?: string;
};
export type TPaymentObligationsResponse = Array<{
  id?: string;
  name?: string;
  amount?: number | string;
  spelledOut?: string;
}>;
