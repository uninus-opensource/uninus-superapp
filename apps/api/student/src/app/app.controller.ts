import { Controller } from "@nestjs/common";

import { AppService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import {
  IGetStudentRequest,
  IDeleteStudentRequest,
  IUpdateStudentRequest,
  TGraduationStatusRequest,
} from "@uninus/entities";

@Controller()
export class AppController {
  constructor(private readonly studentService: AppService) {}
  @MessagePattern("get_student")
  async getStudent(payload: IGetStudentRequest) {
    return await this.studentService.getStudent(payload);
  }

  @MessagePattern("update_student")
  async updateStudent(payload: IUpdateStudentRequest) {
    return await this.studentService.updateStudent(payload);
  }

  @MessagePattern("delete_student")
  async deleteStudent(payload: IDeleteStudentRequest) {
    return await this.studentService.deleteStudent(payload);
  }
  @MessagePattern("get_graduation_status")
  async getGraduationStatus(payload: TGraduationStatusRequest) {
    return await this.studentService.checkGraduationStatus(payload);
  }
}
