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
  getStudent(payload: IGetStudentRequest) {
    return this.studentService.getStudent(payload);
  }

  @MessagePattern("update_student")
  updateStudent(payload: IUpdateStudentRequest) {
    return this.studentService.updateStudent(payload);
  }

  @MessagePattern("delete_student")
  deleteStudent(payload: IDeleteStudentRequest) {
    return this.studentService.deleteStudent(payload);
  }
  @MessagePattern("get_graduation_status")
  getGraduationStatus(payload: TGraduationStatusRequest) {
    return this.studentService.checkGraduationStatus(payload);
  }
}
