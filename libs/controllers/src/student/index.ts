import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from '@uninus/entities';
import { StudentService } from '@uninus/services';

@Controller('student')
export class StudentController {
  constructor(private readonly appService: StudentService) {}

  @Post('/:id')
  createData(@Param('id') id: string, @Body('') studentData: CreateStudentDto) {
    return this.appService.createStudent(id, studentData);
  }

  @Get('/:id')
  getData(@Param('id') id: string) {
    return this.appService.getStudent(id);
  }

  @Put('/:id')
  updateData(@Param('id') id: string, @Body('') studentData: UpdateStudentDto) {
    return this.appService.updateStudent(id, studentData);
  }

  @Delete('/:id')
  deleteData(@Param('id') id: string) {
    return this.appService.deleteStudent(id);
  }
}
