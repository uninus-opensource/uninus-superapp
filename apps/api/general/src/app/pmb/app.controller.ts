import { Controller } from "@nestjs/common";

import { PMBService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import {
  ISelectRequest,
  TCreateQuestionRequest,
  TUpdateQuestionRequest,
  ISelectionRequest,
  IRegistransRequest,
  IInterestEducationPrograms,
  IInterestDepartment,
  TCreateSelectionPathRequest,
  TCreateScholarshipRequest,
  TUpdateScholarshipRequest,
  TUpdateSelectionPathRequest,
} from "@uninus/entities";

@Controller()
export class PMBController {
  constructor(private readonly appService: PMBService) {}
  @MessagePattern("get_scholarship")
  async getScholarship(payload: ISelectRequest) {
    return await this.appService.getScholarship(payload);
  }
  @MessagePattern("create_scholarship")
  async createScholarship(payload: TCreateScholarshipRequest) {
    return await this.appService.createScholarship(payload);
  }
  @MessagePattern("update_scholarship")
  async updateScholarship(payload: TUpdateScholarshipRequest) {
    return await this.appService.updateScholarship(payload);
  }
  @MessagePattern("delete_scholarship")
  async deleteScholarship(payload: { id: string }) {
    return await this.appService.deleteScholarship(payload);
  }
  @MessagePattern("get_selection_path")
  async getSelectionPath(payload: ISelectionRequest) {
    return await this.appService.getSelectionPath(payload);
  }
  @MessagePattern("get_registration_path")
  async getRegistrationPath(payload: ISelectionRequest) {
    return await this.appService.getRegistrationPath(payload);
  }
  @MessagePattern("create_selection_path")
  async createSelectionPath(payload: TCreateSelectionPathRequest) {
    return await this.appService.createSelectionPath(payload);
  }
  @MessagePattern("update_selection_path")
  async updateSelectionPath(payload: TUpdateSelectionPathRequest) {
    return await this.appService.updateSelectionPath(payload);
  }
  @MessagePattern("delete_selection_path")
  async deleteSelectionpath(payload: { id: string }) {
    return await this.appService.deleteSelectionPath(payload);
  }
  @MessagePattern("get_registrans")
  async getRegistrans(payload: IRegistransRequest) {
    return await this.appService.getTotalRegistrans(payload);
  }

  @MessagePattern("get_interest_education_program")
  async getInterestEducationProgram(payload: IInterestEducationPrograms) {
    return await this.appService.getInterestEducationPrograms(payload);
  }

  @MessagePattern("get_interest_department")
  async getStudyProgramInterest(payload: IInterestDepartment) {
    return await this.appService.getInterestDepartment(payload);
  }
  @MessagePattern("get_registration_status")
  async getRegistrationStatus(payload: ISelectRequest) {
    return await this.appService.getRegistrationStatus(payload);
  }
  @MessagePattern("get_admission_test")
  async getAdmissionTest() {
    return await this.appService.getAdmissionTest();
  }

  @MessagePattern("create_admission_test")
  async createAdmissionTest(payload: TCreateQuestionRequest) {
    return await this.appService.createAdmissionTest(payload);
  }

  @MessagePattern("update_admission_test")
  async updateAdmissionTest(payload: TUpdateQuestionRequest) {
    return await this.appService.updateAdmissionTest(payload);
  }

  @MessagePattern("delete_admission_test")
  async deleteAdmissionTest(payload: { id: string }) {
    return await this.appService.deleteAdmissionTest(payload);
  }
}
