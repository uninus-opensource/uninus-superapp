import { Controller } from "@nestjs/common";

import { AppService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import { TPaginationArgs } from "@uninus/entities";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern("get_employees")
  getEmployees({ where, orderBy, page, perPage }: TPaginationArgs) {
    return this.appService.getEmployees({ where, orderBy, page, perPage });
  }

  @MessagePattern("get_total_employees")
  getTotalEmployees() {
    return this.appService.getTotalEmployees();
  }
}
