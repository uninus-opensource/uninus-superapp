import { Controller, Get, Inject, Query, UseFilters } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { RpcExceptionToHttpExceptionFilter } from "@uninus/api/pipes";
import { catchError, firstValueFrom, throwError } from "rxjs";

@Controller("finance")
@ApiTags("Finance")
export class FinanceController {
  constructor(@Inject("FINANCE_SERVICE") private readonly client: ClientProxy) {}

  @Get("/payment-summary")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Data Finance Summary" })
  @ApiQuery({ name: "filter", required: false })
  @ApiQuery({ name: "start_date", required: false })
  @ApiQuery({ name: "end_date", required: false })
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
}
