import { Controller } from "@nestjs/common";

import { AppService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import {
  ISelectDepartmentRequest,
  ISelectFacultyRequest,
  ISelectRequest,
  ISelectEducationHistoryRequest,
  IOccupationPositionRequest,
  TCreateQuestionRequest,
  TUpdateQuestionRequest,
  IEducationMajorRequest,
  IEducationTypeRequest,
  ISelectionRequest,
  IRegistransRequest,
  IInterestEducationPrograms,
  IInterestDepartment,
} from "@uninus/entities";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern("get_degree")
  getDegreeProgram(payload: ISelectRequest) {
    return this.appService.getDegreeProgram(payload);
  }

  @MessagePattern("get_faculty")
  getFaculty(payload: ISelectFacultyRequest) {
    return this.appService.getFaculty(payload);
  }

  @MessagePattern("get_department")
  getDepartment(payload: ISelectDepartmentRequest) {
    return this.appService.getDepartment(payload);
  }

  @MessagePattern("get_religion")
  getReligion(payload: ISelectRequest) {
    return this.appService.getReligion(payload);
  }

  @MessagePattern("get_marital_status")
  getMaritalStatus(payload: ISelectRequest) {
    return this.appService.getMaritalStatus(payload);
  }

  @MessagePattern("get_gender")
  getGender(payload: ISelectRequest) {
    return this.appService.getGender(payload);
  }

  @MessagePattern("get_citizenship")
  getCitizenship(payload: ISelectRequest) {
    return this.appService.getCitizenship(payload);
  }

  @MessagePattern("get_selection_path")
  getSelectionPath(payload: ISelectionRequest) {
    return this.appService.getSelectionPath(payload);
  }

  @MessagePattern("get_salary")
  getSalary(payload: ISelectRequest) {
    return this.appService.getSalary(payload);
  }

  @MessagePattern("get_education_history")
  getEducationHistory(payload: ISelectEducationHistoryRequest) {
    return this.appService.getEducation(payload);
  }

  @MessagePattern("get_occupation")
  getOccupation(payload: ISelectRequest) {
    return this.appService.getOccupation(payload);
  }

  @MessagePattern("get_occupation_position")
  getOccupationPosition(payload: IOccupationPositionRequest) {
    return this.appService.getOccupationPosition(payload);
  }

  @MessagePattern("get_dissabilities")
  getDissabilities(payload: ISelectRequest) {
    return this.appService.getDisabilites(payload);
  }

  @MessagePattern("get_year_graduate")
  getYearGraduate() {
    return this.appService.getYearGraduate();
  }

  @MessagePattern("get_scholarship")
  getScholarship(payload: ISelectRequest) {
    return this.appService.getScholarship(payload);
  }

  @MessagePattern("get_education_type")
  getSchoolType(payload: IEducationTypeRequest) {
    return this.appService.getEducationType(payload);
  }

  @MessagePattern("get_question")
  getQuestion() {
    return this.appService.getAllQuestion();
  }

  @MessagePattern("create_question")
  createQuestion(payload: TCreateQuestionRequest) {
    return this.appService.createQuestion(payload);
  }

  @MessagePattern("update_question")
  updateQuestion(id: number, payload: TUpdateQuestionRequest) {
    return this.appService.updateQuestion(id, payload);
  }

  @MessagePattern("delete_question")
  deleteQuestion(id: number) {
    return this.appService.deleteQuestion(id);
  }

  @MessagePattern("get_parent_status")
  getParentStatus(payload: ISelectRequest) {
    return this.appService.getParentStatus(payload);
  }

  @MessagePattern("get_parent_education")
  getParentEducation(payload: ISelectRequest) {
    return this.appService.getParentEducation(payload);
  }

  @MessagePattern("get_education_major")
  getEducationMajor(payload: IEducationMajorRequest) {
    return this.appService.getEducationMajor(payload);
  }

  @MessagePattern("get_registrans")
  getRegistrans(payload: IRegistransRequest) {
    return this.appService.getTotalRegistrans(payload);
  }

  @MessagePattern("get_interest_education_program")
  getInterestEducationProgram(payload: IInterestEducationPrograms) {
    return this.appService.getInterestEducationPrograms(payload);
  }

  @MessagePattern("get_interest_department")
  getStudyProgramInterest(payload: IInterestDepartment) {
    return this.appService.getInterestDepartment(payload);
  }

  @MessagePattern("get_registration_status")
  getRegistrationStatus(payload: ISelectRequest) {
    return this.appService.getRegistrationStatus(payload);
  }

  @MessagePattern("get_country")
  getCountry(payload: { search: string; citizenship_id: string; id: number }) {
    return this.appService.getCountry(payload);
  }

  @MessagePattern("get_subdistrict")
  getSubdistrict(payload: { id: number; city_id: string; search: string }) {
    return this.appService.getSubDistrict(payload);
  }

  @MessagePattern("get_city")
  getCity(payload: { id: number; province_id: string; search: string }) {
    return this.appService.getCity(payload);
  }

  @MessagePattern("get_province")
  getProvince(payload: { search: string; id: number }) {
    return this.appService.getProvince(payload);
  }
}
