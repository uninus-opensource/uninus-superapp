import { Controller } from "@nestjs/common";

import { AppService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern("get_finance_summary")
  getFinanceSummary() {
    return this.appService.getFinanceSummary();
  }

  @MessagePattern("request_payment")
  requestPayment(payload) {
    return this.appService.requestPayment(payload);
  }

  @MessagePattern("status_payment")
  statusPayment(payload) {
    return this.appService.statusPayment(payload);
  }
}
