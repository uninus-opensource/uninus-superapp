import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { AppService } from "./app.service";
import { TPaymentRequest } from "@uninus/entities";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern("payment")
  payment(payload: TPaymentRequest) {
    return this.appService.payment(payload);
  }
}
