import { Controller } from "@nestjs/common";

import { CollegeService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import {
  IDegreeProgramRequest,
  IGetFacultyRequest,
  ICreateFacultyRequest,
  IUpdateFacultyRequest,
  IDeleteFacultyRequest,
  IGetDepartmentRequest,
  ICreateDepartmentRequest,
  IUpdateDepartmentRequest,
  IDeleteDepartmentRequest,
} from "@uninus/entities";

@Controller()
export class CollegeController {
  constructor(private readonly appService: CollegeService) {}

  @MessagePattern("get_degree")
  async getDegreeProgram(payload: IDegreeProgramRequest) {
    return await this.appService.getDegreeProgram(payload);
  }

  @MessagePattern("get_faculty")
  async getFaculty(payload: IGetFacultyRequest) {
    return await this.appService.getFaculty(payload);
  }
  @MessagePattern("create_faculty")
  async createFaculty(payload: ICreateFacultyRequest) {
    return await this.appService.createFaculty(payload);
  }
  @MessagePattern("update_faculty")
  async updateFaculty(payload: IUpdateFacultyRequest) {
    return await this.appService.updateFaculty(payload);
  }
  @MessagePattern("delete_faculty")
  async deleteFaculty(payload: IDeleteFacultyRequest) {
    return await this.appService.deleteFaculty(payload);
  }
  @MessagePattern("get_department")
  async getDepartment(payload: IGetDepartmentRequest) {
    return await this.appService.getDepartment(payload);
  }

  @MessagePattern("create_department")
  async createDepartment(payload: ICreateDepartmentRequest) {
    return await this.appService.createDepartment(payload);
  }

  @MessagePattern("update_department")
  async updateDepartment(payload: IUpdateDepartmentRequest) {
    return await this.appService.updateDepartment(payload);
  }
  @MessagePattern("delete_department")
  async deleteDepartment(payload: IDeleteDepartmentRequest) {
    return await this.appService.deleteDepartment(payload);
  }
}
