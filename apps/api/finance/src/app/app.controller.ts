import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import {
  TCreatePaymentRequest,
  TStatusPaymentRequest,
  TFinanceSummaryRequest,
  TPaymentCallbackHeaders,
  TPaymentCallbackRequest,
} from "@uninus/entities";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern("get_data_finance_summary")
  async getFinanceSummary(payload: TFinanceSummaryRequest) {
    return await this.appService.getFinanceSummary(payload);
  }

  @MessagePattern("create_payment")
  createPayment(payload: TCreatePaymentRequest) {
    return this.appService.createPayment(payload);
  }

  @MessagePattern("status_payment")
  statusPayment(payload: TStatusPaymentRequest) {
    return this.appService.statusPayment(payload);
  }

  @MessagePattern("finance_callback")
  financeCallback(payload: TPaymentCallbackRequest & TPaymentCallbackHeaders) {
    return this.appService.financeCallback(payload);
  }
}
