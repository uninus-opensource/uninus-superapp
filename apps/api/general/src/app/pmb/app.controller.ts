import { Controller } from "@nestjs/common";

import { PMBService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import {
  ISelectDepartmentRequest,
  ISelectFacultyRequest,
  ISelectRequest,
  TCreateQuestionRequest,
  TUpdateQuestionRequest,
  ISelectionRequest,
  IRegistransRequest,
  IInterestEducationPrograms,
  IInterestDepartment,
  TCreateFacultyRequest,
  TCreateDepartmentRequest,
  TCreateSelectionPathRequest,
  TCreateScholarshipRequest,
} from "@uninus/entities";
import { CreateScholarship } from "@uninus/api/dto";

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
  async updateScholarship(payload: CreateScholarship & { id: number }) {
    return await this.appService.updateScholarship(payload);
  }
  @MessagePattern("delete_scholarship")
  async deleteScholarship(payload: { id: number }) {
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
  async updateSelectionPath(payload: TCreateSelectionPathRequest & { id: number }) {
    return await this.appService.updateSelectionPath(payload);
  }
  @MessagePattern("delete_selection_path")
  async deleteSelectionpath(payload: { id: number }) {
    return await this.appService.deleteSelectionPath(payload);
  }
  @MessagePattern("get_degree")
  async getDegreeProgram(payload: ISelectRequest) {
    return await this.appService.getDegreeProgram(payload);
  }

  @MessagePattern("get_faculty")
  async getFaculty(payload: ISelectFacultyRequest) {
    return await this.appService.getFaculty(payload);
  }
  @MessagePattern("create_faculty")
  async createFaculty(payload: TCreateFacultyRequest) {
    return await this.appService.createFaculty(payload);
  }
  @MessagePattern("update_faculty")
  async updateFaculty(payload: TCreateFacultyRequest & { id: number }) {
    return await this.appService.updateFaculty(payload);
  }
  @MessagePattern("delete_faculty")
  async deleteFaculty(payload: { id: number }) {
    return await this.appService.deleteFaculty(payload);
  }
  @MessagePattern("get_department")
  async getDepartment(payload: ISelectDepartmentRequest) {
    return await this.appService.getDepartment(payload);
  }

  @MessagePattern("create_department")
  async createDepartment(payload: TCreateDepartmentRequest) {
    return await this.appService.createDepartment(payload);
  }

  @MessagePattern("update_department")
  async updateDepartment(payload: TCreateDepartmentRequest & { id: number }) {
    return await this.appService.updateDepartment(payload);
  }
  @MessagePattern("delete_department")
  async deleteDepartment(payload: { id: number }) {
    return await this.appService.deleteDepartment(payload);
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
  @MessagePattern("get_question")
  async getQuestion() {
    return await this.appService.getAllQuestion();
  }

  @MessagePattern("create_question")
  async createQuestion(payload: TCreateQuestionRequest) {
    return await this.appService.createQuestion(payload);
  }

  @MessagePattern("update_question")
  async updateQuestion(payload: TUpdateQuestionRequest & { id: number }) {
    return await this.appService.updateQuestion(payload);
  }

  @MessagePattern("delete_question")
  async deleteQuestion(payload: { id: number }) {
    return await this.appService.deleteQuestion(payload);
  }
}
