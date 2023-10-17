import { Controller } from "@nestjs/common";

import { AppService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import { TFinanceSummaryRequest } from "@uninus/entities";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern("get_finance_summary")
  getFinanceSummary(payload: TFinanceSummaryRequest) {
    return this.appService.getFinanceSummary(payload);
  }
}
