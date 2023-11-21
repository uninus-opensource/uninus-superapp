import { ClientProxy, RpcException } from "@nestjs/microservices";
import { ApiBearerAuth, ApiHeaders, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreatePaymentDto, StatusPaymentDto } from "@uninus/api/dto";
import { JwtAuthGuard } from "@uninus/api/guard";
import { RpcExceptionToHttpExceptionFilter, ZodValidationPipe } from "@uninus/api/pipes";
import { catchError, firstValueFrom, throwError } from "rxjs";
import {
  Controller,
  Get,
  Inject,
  Post,
  Body,
  UseGuards,
  Query,
  UseFilters,
  Request,
} from "@nestjs/common";
import { TPaymentCallbackRequest, TReqToken, TVSHeaderFinance } from "@uninus/entities";
import { RequestHeaders } from "@uninus/api/decorators";
import { VSHeaderFinance } from "@uninus/entities";

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

  @ApiBearerAuth("bearer")
  @Post("request-payment")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async requestPayment(@Body() payload: CreatePaymentDto, @Request() reqToken: TReqToken) {
    const { sub: userId } = reqToken.user;
    const response = await firstValueFrom(
      this.client
        .send("request_payment", { userId, ...payload })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @ApiBearerAuth("bearer")
  @Post("status-payment")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async statusPayment(@Body() payload: StatusPaymentDto, @Request() reqToken: TReqToken) {
    const { sub: userId } = reqToken.user;
    const response = await firstValueFrom(
      this.client
        .send("status_payment", { userId, ...payload })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @ApiBearerAuth("basic")
  @ApiHeaders([
    {
      name: "timestamp",
      required: true,
    },
    {
      name: "signature",
      required: true,
    },
  ])
  @Post("callback")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async callback(
    @RequestHeaders(new ZodValidationPipe(VSHeaderFinance)) headers: TVSHeaderFinance,
    @Body() payload: TPaymentCallbackRequest,
  ) {
    const { timestamp, authorization, signature } = headers;
    const response = await firstValueFrom(
      this.client
        .send("finance_callback", {
          timestamp: Number(timestamp),
          authorization,
          signature,
          ...payload,
        })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
}
