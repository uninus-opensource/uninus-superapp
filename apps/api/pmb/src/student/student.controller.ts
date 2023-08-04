import { Controller } from "@nestjs/common";

import { StudentService } from "./student.service";
import { MessagePattern } from '@nestjs/microservices';
import {
  IGetStudentRequest,
  IDeleteStudentRequest,
  IUpdateStudentRequest,
} from "@uninus/entities";

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @MessagePattern('get_student')
  getStudent(payload:IGetStudentRequest) {
    return this.studentService.getStudent(payload);
  }

  @MessagePattern('update_student')
  updateStudent(payload:IUpdateStudentRequest) {
    return this.studentService.updateStudent(payload);
  }

  @MessagePattern('delete_student')
  deleteStudent(payload:IDeleteStudentRequest) {
    return this.studentService.deleteStudent(payload);
  }
}
