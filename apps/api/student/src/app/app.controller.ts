import { Controller } from "@nestjs/common";

import { AppService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import {
  IGetStudentRequest,
  IDeleteStudentRequest,
  IUpdateStudentRequest,
  TGraduationStatusRequest,
  TPaymentObligationsRequest,
  TStudentsPaginationArgs,
} from "@uninus/entities";
@Controller()
export class AppController {
  constructor(private readonly studentService: AppService) {}
  @MessagePattern("get_student")
  async getDataStudent(payload: IGetStudentRequest) {
    return await this.studentService.getDataStudent(payload);
  }

  @MessagePattern("get_students")
  async getDataStudents(payload: TStudentsPaginationArgs) {
    return await this.studentService.getDataStudents(payload);
  }

  @MessagePattern("update_student")
  async updateDataStudent(payload: IUpdateStudentRequest) {
    return await this.studentService.updateDataStudent(payload);
  }

  @MessagePattern("delete_student")
  async deleteDataStudent(payload: IDeleteStudentRequest) {
    return await this.studentService.deleteDataStudent(payload);
  }
  @MessagePattern("get_graduation_status")
  async getGraduationStatus(payload: TGraduationStatusRequest) {
    return await this.studentService.checkGraduationStatus(payload);
  }
  @MessagePattern("get_payment_obligations")
  async getPaymentObligations(payload: TPaymentObligationsRequest) {
    return await this.studentService.getPaymentObligations(payload);
  }
}
