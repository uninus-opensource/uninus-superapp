import { Controller } from "@nestjs/common";

import { GeneralService } from "./general.service";
import { MessagePattern } from '@nestjs/microservices';
import { ISelectDepartmentRequest, ISelectFacultyRequest, ISelectRequest } from "@uninus/entities";

@Controller()
export class GeneralController {
  constructor(private readonly appService: GeneralService) {}
  @MessagePattern('get_degree')
  getDegreeProgram(payload:{search:string}) {
    return this.appService.getDegreeProgram(payload);
  }

  @MessagePattern('get_faculty')
  getFaculty(payload:ISelectFacultyRequest ) {
    return this.appService.getFaculty(payload);
  }

  @MessagePattern('get_department')
  getDepartment(payload:ISelectDepartmentRequest) {
    return this.appService.getDepartment(payload);
  }

  @MessagePattern('get_religion')
  getReligion(payload:ISelectRequest ) {
    return this.appService.getReligion(payload);
  }

  @MessagePattern('get_marital_status')
  getMaritalStatus(payload:ISelectRequest) {
    return this.appService.getMaritalStatus(payload);
  }

  @MessagePattern('get_gender')
  getGender(payload:ISelectRequest) {
    return this.appService.getGender(payload);
  }

  @MessagePattern('get_citizenship')
  getCitizenship(payload:ISelectRequest) {
    return this.appService.getCitizenship(payload);
  }

  @MessagePattern('get_selection_path')
  getSelectionPath(payload:ISelectRequest) {
    return this.appService.getSelectionPath(payload);
  }

  @MessagePattern('get_salary')
  getSalary(payload:ISelectRequest) {
    return this.appService.getSalary(payload);
  }

  @MessagePattern('get_education_history')
  getEducationHistory(payload:ISelectRequest) {
    return this.appService.getEducationHistory(payload);
  }

  @MessagePattern('get_occupation')
  getOccupation(payload:ISelectRequest) {
    return this.appService.getOccupation(payload);
  }

  @MessagePattern('get_dissabilities')
  getDissabilities(payload:ISelectRequest) {
    return this.appService.getDisabilites(payload);
  }
}
