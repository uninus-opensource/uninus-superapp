import { Controller } from "@nestjs/common";

import { AppService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import { TCreatePaymentRequest, TStatusPaymentRequest } from "@uninus/entities";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern("get_finance_summary")
  getFinanceSummary() {
    return this.appService.getFinanceSummary();
  }

  @MessagePattern("request_payment")
  requestPayment(payload: TCreatePaymentRequest) {
    return this.appService.requestPayment(payload);
  }

  @MessagePattern("status_payment")
  statusPayment(payload: TStatusPaymentRequest) {
    return this.appService.statusPayment(payload);
  }
}
