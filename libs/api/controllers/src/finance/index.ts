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
  @ApiQuery({ name: "range", required: false })
  async financeSummary(@Query("filter") filter: string, @Query("range") range: string) {
    const response = await firstValueFrom(
      this.client
        .send("get_finance_summary", { filter, range })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
}
