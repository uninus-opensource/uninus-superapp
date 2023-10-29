import { Controller, Get, Inject, Post, UseFilters, Body, UseGuards } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { CreatePaymentDto, StatusPaymentDto } from "@uninus/api/dto";
import { JwtAuthGuard } from "@uninus/api/guard";
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
  @UseGuards(JwtAuthGuard)
  async requestPayment(@Body() payload: CreatePaymentDto) {
    const response = await firstValueFrom(
      this.client
        .send("request_payment", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Post("status-payment")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async statusPayment(@Body() payload: StatusPaymentDto) {
    const response = await firstValueFrom(
      this.client
        .send("status_payment", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
}
