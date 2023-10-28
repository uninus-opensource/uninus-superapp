import { Controller, Get, Inject, Post, UseFilters, Body } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { RpcExceptionToHttpExceptionFilter } from "@uninus/api/pipes";
import { catchError, firstValueFrom, throwError } from "rxjs";

@Controller("finance")
@ApiTags("Finance")
export class FinanceController {
  constructor(@Inject("FINANCE_SERVICE") private readonly client: ClientProxy) {}

  @Get()
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async financeSummary() {
    const response = await firstValueFrom(
      this.client
        .send("get_finance_summary", {})
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Post("request-payment")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async requestPayment(
    @Body()
    payload: {
      email: string;
      firstName: string;
      lastName: string;
      phone: string;
      amount: number;
      orderId: string;
    },
  ) {
    const response = await firstValueFrom(
      this.client
        .send("request_payment", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Post("status-payment")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async statusPayment(@Body() payload: { trxRef: string }) {
    const response = await firstValueFrom(
      this.client
        .send("status_payment", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
}
