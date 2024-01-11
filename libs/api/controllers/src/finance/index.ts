import {
  ApiBearerAuth,
  ApiBody,
  ApiHeaders,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { CreatePaymentDto, StatusPaymentDto } from "@uninus/api/dto";
import { JwtAuthGuard } from "@uninus/api/guard";
import { ZodValidationPipe } from "@uninus/api/pipes";
import { Controller, Get, Post, Body, UseGuards, Query, Request } from "@nestjs/common";
import {
  EFilterGraph,
  TCreatePaymentRequest,
  TPaymentCallbackRequest,
  TReqToken,
  TStatusPaymentRequest,
  TVSHeaderFinance,
  VSCreatePayment,
  VSStatusPayment,
} from "@uninus/entities";
import { RequestHeaders } from "@uninus/api/decorators";
import { VSHeaderFinance } from "@uninus/entities";
import { FinanceService } from "@uninus/api/services";

@ApiTags("Finance")
@ApiBearerAuth("bearer")
@Controller("finance")
@UseGuards(JwtAuthGuard)
export class FinanceController {
  constructor(private readonly appService: FinanceService) {}

  @ApiOperation({ summary: "Get Data Finance Summary" })
  @ApiQuery({ name: "filter", enum: EFilterGraph, required: false })
  @ApiQuery({ name: "startDate", required: false })
  @ApiQuery({ name: "endDate", required: false })
  @Get("/payment/sumary")
  async financeSummary(
    @Query("filter") filter: EFilterGraph,
    @Query("start_date") startDate: string,
    @Query("end_date") endDate: string,
  ) {
    return await this.appService.financeSummary({ filter, startDate, endDate });
  }

  @ApiOperation({ summary: "Create Payment" })
  @ApiBody({ type: CreatePaymentDto })
  @Post("/payment/create")
  async createPayment(
    @Body(new ZodValidationPipe(VSCreatePayment)) payload: TCreatePaymentRequest,
    @Request() reqToken: TReqToken,
  ) {
    const { sub: userId } = reqToken.user;
    return await this.appService.createPayment({ userId, ...payload });
  }

  @ApiOperation({ summary: "Check Status Payment" })
  @ApiBody({ type: StatusPaymentDto })
  @Post("/payment/status")
  @UseGuards(JwtAuthGuard)
  async statusPayment(
    @Body(new ZodValidationPipe(VSStatusPayment)) payload: TStatusPaymentRequest,
    @Request() reqToken: TReqToken,
  ) {
    const { sub: userId } = reqToken.user;
    return await this.appService.statusPayment({ userId, ...payload });
  }

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
  async callback(
    @RequestHeaders(new ZodValidationPipe(VSHeaderFinance)) headers: TVSHeaderFinance,
    @Body() payload: TPaymentCallbackRequest,
  ) {
    const { timestamp, authorization, signature } = headers;
    return await this.appService.callback({ timestamp, authorization, signature, ...payload });
  }
}
