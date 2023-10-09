import { Controller } from "@nestjs/common";

import { AppService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import { TEmployeePaginationArgs } from "@uninus/entities";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern("get_employees")
  getEmployees({ type, where, orderBy, page, perPage }: TEmployeePaginationArgs) {
    return this.appService.getEmployees({ type, where, orderBy, page, perPage });
  }

  @MessagePattern("get_total_employees")
  getTotalEmployees() {
    return this.appService.getTotalEmployees();
  }

  @MessagePattern("get_lecturer")
  getLecturer(id: string) {
    return this.appService.getLecturer(id);
  }

  @MessagePattern("get_academic_staff")
  getAcademicStaff(id: string) {
    return this.appService.getAcademicStaff(id);
  }
}
