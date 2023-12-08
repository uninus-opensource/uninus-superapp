import { Controller } from "@nestjs/common";

import { CollegeService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import {
  ISelectDepartmentRequest,
  ISelectFacultyRequest,
  ISelectRequest,
  TCreateFacultyRequest,
  TCreateDepartmentRequest,
  TUpdateFacultyRequest,
  TUpdateDepartmentRequest,
  ICreateCurriculumRequest,
  IUpdateCurriculumRequest,
  ICreateCourseRequest,
  IUpdateCourseRequest,
  ICreateCourseScheduleRequest,
  IUpdateCourseScheduleRequest,
} from "@uninus/entities";

@Controller()
export class CollegeController {
  constructor(private readonly appService: CollegeService) {}

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
  async updateFaculty(payload: TUpdateFacultyRequest) {
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
  async updateDepartment(payload: TUpdateDepartmentRequest) {
    return await this.appService.updateDepartment(payload);
  }
  @MessagePattern("delete_department")
  async deleteDepartment(payload: { id: number }) {
    return await this.appService.deleteDepartment(payload);
  }
  @MessagePattern("get_curriculum")
  async getCurriculum(payload: ISelectRequest) {
    return await this.appService.getCurriculum(payload);
  }

  @MessagePattern("get_curriculum_by_id")
  async getCurriculumById(payload: { id: string }) {
    return await this.appService.getCurriculumById(payload);
  }

  @MessagePattern("create_curriculum")
  async createCurriculum(payload: ICreateCurriculumRequest) {
    return await this.appService.createCurriculum(payload);
  }
  @MessagePattern("update_curriculum")
  async updateCurriculum(payload: IUpdateCurriculumRequest) {
    return await this.appService.updateCurriculum(payload);
  }
  @MessagePattern("delete_curriculum")
  async deleteCurriculum(payload: { id: string }) {
    return await this.appService.deleteCurriculum(payload);
  }

  @MessagePattern("get_course")
  async getCourses(payload: ISelectRequest) {
    return await this.appService.getCourses(payload);
  }

  @MessagePattern("get_course_by_id")
  async getCourseById(payload: { id: string }) {
    return await this.appService.getCourseById(payload);
  }

  @MessagePattern("ceate_course")
  async createCourse(payload: ICreateCourseRequest) {
    return await this.appService.createCourse(payload);
  }

  @MessagePattern("update_course")
  async updateCourse(payload: IUpdateCourseRequest) {
    return await this.appService.updateCourse(payload);
  }

  @MessagePattern("delete_course")
  async deleteCourse(payload: { id: string }) {
    return await this.appService.deleteCourse(payload);
  }

  @MessagePattern("get_course_schedule")
  async getCourseSchedule(payload: ISelectRequest) {
    return await this.appService.getCourseSchedule(payload);
  }

  @MessagePattern("get_course_schedule_by_id")
  async getCourseScheduleById(payload: { id: string }) {
    return await this.appService.getCourseScheduleById(payload);
  }

  @MessagePattern("ceate_course_schedule")
  async createCourseSchedule(payload: ICreateCourseScheduleRequest) {
    return await this.appService.createCourseSchedule(payload);
  }

  @MessagePattern("update_course_schedule")
  async updateCourseSchedule(payload: IUpdateCourseScheduleRequest) {
    return await this.appService.updateCourseSchedule(payload);
  }

  @MessagePattern("delete_course_schedule")
  async deleteCourseSchedule(payload: { id: string }) {
    return await this.appService.deleteCourseSchedule(payload);
  }
}
