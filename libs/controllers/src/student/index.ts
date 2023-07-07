import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateStudentDto,
  JwtAuthGuard,
  TReqToken,
  UpdateStudentDto,
} from '@uninus/entities';
import { StudentService } from '@uninus/services';

@Controller('student')
export class StudentController {
  constructor(private readonly appService: StudentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard)
  createData(
    @Request() reqToken: TReqToken,
    @UploadedFile() Image: Express.Multer.File,
    @Body() studentData: CreateStudentDto
  ) {
    const { sub } = reqToken.user;
    return this.appService.createStudent(sub, Image, studentData);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getData(@Request() reqToken: TReqToken) {
    const { sub } = reqToken.user;
    return this.appService.getStudent(sub);
  }

  @Put()
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard)
  updateData(
    @Request() reqToken: TReqToken,
    @UploadedFile() Image: Express.Multer.File,
    @Body() studentData: UpdateStudentDto
  ) {
    const { sub } = reqToken.user;
    return this.appService.updateStudent(sub, Image, studentData);
  }

  @Delete('/:id')
  deleteData(@Param('id') id: string) {
    return this.appService.deleteStudent(id);
  }
}
