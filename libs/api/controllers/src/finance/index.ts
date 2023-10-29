<<<<<<< HEAD
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
=======
import { Controller, Get, Inject, Post, UseFilters, Body, UseGuards } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
>>>>>>> 4aeb9d1e (improvement: setup integration payment)
import { CreatePaymentDto, StatusPaymentDto } from "@uninus/api/dto";
import { JwtAuthGuard } from "@uninus/api/guard";
import { RpcExceptionToHttpExceptionFilter } from "@uninus/api/pipes";
import { catchError, firstValueFrom, throwError } from "rxjs";
import { Controller, Get, Inject, Post, Body, UseGuards, Query, UseFilters } from "@nestjs/common";

@Controller("finance")
@ApiTags("Finance")
export class FinanceController {
  constructor(@Inject("FINANCE_SERVICE") private readonly client: ClientProxy) {}

  @Get("/payment-summary")
  @ApiOperation({ summary: "Get Data Finance Summary" })
  @ApiQuery({ name: "filter", required: false })
  @ApiQuery({ name: "start_date", required: false })
  @ApiQuery({ name: "end_date", required: false })
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async financeSummary(
    @Query("filter") filter: string,
    @Query("start_date") start_date: string,
    @Query("end_date") end_date: string,
  ) {
    const response = await firstValueFrom(
      this.client
        .send("get_data_finance_summary", { filter, start_date, end_date })
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
