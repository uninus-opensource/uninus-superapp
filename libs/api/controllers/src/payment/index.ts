import { Controller, Post, Inject, Body, UseFilters, UsePipes } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, firstValueFrom, throwError } from "rxjs";
import { ApiTags } from "@nestjs/swagger";
import { VSPayment } from "@uninus/entities";
import { RpcExceptionToHttpExceptionFilter } from "@uninus/api/filter";
import { ZodValidationPipe } from "@uninus/api/validator";
import { PaymentDto } from "@uninus/api/dto";

@ApiTags("Payment")
@Controller("payment")
export class PaymentController {
  constructor(@Inject("PAYMENT_SERVICE") private readonly client: ClientProxy) {}

  @Post()
  @UsePipes(new ZodValidationPipe(VSPayment))
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async payment(@Body() payload: PaymentDto) {
    const response = await firstValueFrom(
      this.client
        .send("payment", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
}
