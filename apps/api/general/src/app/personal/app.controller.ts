import { Controller } from "@nestjs/common";

import { PersonalService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import {
  ISelectRequest,
  ISelectEducationHistoryRequest,
  IEducationMajorRequest,
  IEducationTypeRequest,
  TCreateEducationRequest,
} from "@uninus/entities";

@Controller()
export class PersonalController {
  constructor(private readonly appService: PersonalService) {}

  @MessagePattern("get_country")
  async getCountry(payload: { search: string; citizenship_id: string }) {
    return await this.appService.getCountry(payload);
  }

  @MessagePattern("get_province")
  async getProvince(payload: { search: string }) {
    return await this.appService.getProvince(payload);
  }
  @MessagePattern("get_city")
  async getCity(payload: { search: string; province_id: string }) {
    return await this.appService.getCity(payload);
  }
  @MessagePattern("get_subdistrict")
  async getSubdistrict(payload: { search: string; city_id: string }) {
    return await this.appService.getSubDistrict(payload);
  }
  @MessagePattern("get_religion")
  async getReligion(payload: ISelectRequest) {
    return await this.appService.getReligion(payload);
  }
  @MessagePattern("get_marital_status")
  async getMaritalStatus(payload: ISelectRequest) {
    return await this.appService.getMaritalStatus(payload);
  }
  @MessagePattern("get_gender")
  async getGender(payload: ISelectRequest) {
    return await this.appService.getGender(payload);
  }

  @MessagePattern("get_citizenship")
  async getCitizenship(payload: ISelectRequest) {
    return await this.appService.getCitizenship(payload);
  }
  @MessagePattern("get_salary")
  async getSalary(payload: ISelectRequest) {
    return await this.appService.getSalary(payload);
  }
  @MessagePattern("get_occupation")
  async getOccupation(payload: ISelectRequest) {
    return await this.appService.getOccupation(payload);
  }
  @MessagePattern("get_dissabilities")
  async getDissabilities(payload: ISelectRequest) {
    return await this.appService.getDisabilites(payload);
  }

  @MessagePattern("get_parent_status")
  async getParentStatus(payload: ISelectRequest) {
    return await this.appService.getParentStatus(payload);
  }

  @MessagePattern("get_parent_education")
  async getParentEducation(payload: ISelectRequest) {
    return await this.appService.getParentEducation(payload);
  }
  @MessagePattern("get_last_education")
  async getLastEducation(payload: ISelectEducationHistoryRequest) {
    return await this.appService.getLastEducation(payload);
  }
  @MessagePattern("get_last_education_type")
  async getLastEducationType(payload: IEducationTypeRequest) {
    return await this.appService.getLastEducationType(payload);
  }
  @MessagePattern("get_last_education_major")
  async getLastEducationMajor(payload: IEducationMajorRequest) {
    return await this.appService.getLastEducationMajor(payload);
  }
  @MessagePattern("create_last_education")
  async createLastEducation(payload: TCreateEducationRequest) {
    return await this.appService.createLastEducation(payload);
  }
  @MessagePattern("update_last_education")
  async updateLastEducation(payload: TCreateEducationRequest) {
    return await this.appService.updateLastEducation(payload);
  }
  @MessagePattern("delete_last_education")
  async deleteLastEducation(payload: { id: number; npsn?: string }) {
    return await this.appService.deleteLastEducation(payload);
  }
}
