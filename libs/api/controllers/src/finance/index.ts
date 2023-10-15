import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { catchError, firstValueFrom, throwError } from "rxjs";

@Controller("finance")
@ApiTags("finance")
export class FinanceController {
  constructor(@Inject("FINANCE_SERVICE") private readonly client: ClientProxy) {}

  @Get()
  async financeSummary() {
    const response = await firstValueFrom(
      this.client
        .send("get_finance_summary", {})
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
}
