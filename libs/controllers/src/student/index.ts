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
import { ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('student')
@ApiTags('Student')
export class StudentController {
  constructor(private readonly appService: StudentService) {}

  @Post()
  @ApiResponse({
    status: 400,
    description: 'User tidak ditemukan',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
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
  @ApiResponse({
    status: 400,
    description: 'Data tidak ditemukan',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  getData(@Request() reqToken: TReqToken) {
    const { sub } = reqToken.user;
    return this.appService.getStudent(sub);
  }

  @Put()
  @ApiResponse({
    status: 400,
    description: 'User tidak ditemukan',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
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
  @ApiResponse({
    status: 400,
    description: 'User tidak ditemukan',
  })
  deleteData(@Param('id') id: string) {
    return this.appService.deleteStudent(id);
  }
}
