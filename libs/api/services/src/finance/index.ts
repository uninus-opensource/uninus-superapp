import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, firstValueFrom, throwError } from "rxjs";
import { Inject, Injectable } from "@nestjs/common";
import {
  TCreatePaymentRequest,
  TCreatePaymentResponse,
  TFinanceSummaryRequest,
  TFinanceSummaryResponse,
  TPaymentCallbackHeaders,
  TPaymentCallbackRequest,
  TPaymentCallbackResponse,
  TStatusPaymentRequest,
  TStatusPaymentResponse,
} from "@uninus/entities";

@Injectable()
export class FinanceService {
  constructor(@Inject("FINANCE_SERVICE") private readonly client: ClientProxy) {}
  async financeSummary(payload: TFinanceSummaryRequest): Promise<TFinanceSummaryResponse> {
    const response = await firstValueFrom(
      this.client
        .send("get_data_finance_summary", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async createPayment(payload: TCreatePaymentRequest): Promise<TCreatePaymentResponse> {
    const response = await firstValueFrom(
      this.client
        .send("request_payment", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async statusPayment(payload: TStatusPaymentRequest): Promise<TStatusPaymentResponse> {
    const response = await firstValueFrom(
      this.client
        .send("status_payment", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async callback(
    payload: TPaymentCallbackRequest & TPaymentCallbackHeaders,
  ): Promise<TPaymentCallbackResponse> {
    const response = await firstValueFrom(
      this.client
        .send("finance_callback", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
}
