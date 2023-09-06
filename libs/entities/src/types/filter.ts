export type TRpcException = {
  response: {
    message: string;
    error: string;
    statusCode: number;
  };
  status: number;
  message: string;
  name: string;
};
