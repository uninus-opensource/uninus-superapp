import { Controller } from "@nestjs/common";

import { AppService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import { ISelectRequest, TEmployeePaginationArgs } from "@uninus/entities";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern("get_employees")
  getEmployees(payload: TEmployeePaginationArgs) {
    return this.appService.getEmployees(payload);
  }

  @MessagePattern("get_total_employees")
  getTotalEmployees() {
    return this.appService.getTotalEmployees();
  }

  @MessagePattern("get_lecturer")
  getLecturer(payload: { id: string }) {
    return this.appService.getLecturer(payload);
  }

  @MessagePattern("get_academic_staff")
  getAcademicStaff(payload: { id: string }) {
    return this.appService.getAcademicStaff(payload);
  }

  @MessagePattern("get_employee_categories")
  async getCategories(payload: ISelectRequest) {
    return await this.appService.getCategories(payload);
  }

  @MessagePattern("get_employee_types")
  async getEmployeeTypes(payload: ISelectRequest) {
    return await this.appService.getEmployeeTypes(payload);
  }

  @MessagePattern("get_lecturer_types")
  async getLecturerTypes(payload: ISelectRequest) {
    return await this.appService.getLecturerTypes(payload);
  }

  @MessagePattern("get_academic_staff_types")
  async getAcademicStaffTypes(payload: ISelectRequest) {
    return await this.appService.getAcademicStaffTypes(payload);
  }

  @MessagePattern("create_employee")
  async create() {
    return await this.appService.createEmployee();
  }
}
