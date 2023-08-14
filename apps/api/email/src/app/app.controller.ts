import { Controller } from "@nestjs/common";

import { AppService } from "./app.service";
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern('send_email')
  sendEmail({ email, subject, html }) {
    return this.appService.sendEmail(email, subject, html);
  }
}
