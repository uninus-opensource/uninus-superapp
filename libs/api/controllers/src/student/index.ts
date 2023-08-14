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
  BadRequestException,
  Inject,
  UseFilters,
} from "@nestjs/common";
import { TFIle, VSRegistrationNumber } from "@uninus/entities";
import { FileInterceptor } from "@nestjs/platform-express";
import { TReqToken, VSUpdateStudent } from "@uninus/entities";
import { JwtAuthGuard } from "@uninus/api/guard";
import { ZodValidationPipe } from "@uninus/api/validator";
import { GraduationStatusSwagger, UpdateStudentSwagger } from "@uninus/api/services";
import {
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiOperation,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { RpcExceptionToHttpExceptionFilter } from "@uninus/api/filter";

@Controller("student")
@ApiTags("Student")
export class StudentController {
  constructor(@Inject("STUDENT_SERVICE") private readonly client: ClientProxy) {}

  @Post("/graduation-status")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Graduation Status" })
  @ApiResponse({
    status: 400,
    description: "User tidak ditemukan",
  })
  async graduationStatus(
    @Body(new ZodValidationPipe(VSRegistrationNumber)) registration_number: GraduationStatusSwagger,
  ) {
      const response = await firstValueFrom(
        this.client.send("get_graduation_status", { registration_number }),
      );
      return response;
  }

  @Get()
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get Data Student" })
  @ApiResponse({
    status: 400,
    description: "Data tidak ditemukan",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  @UseGuards(JwtAuthGuard)
  async getData(@Request() reqToken: TReqToken) {
      const { sub: id } = reqToken.user;
      const response = await firstValueFrom(this.client.send("get_student", { id }));
      return response;
  }

  @Put()
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update Data Student" })
  @ApiResponse({
    status: 400,
    description: "User tidak ditemukan",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  @UseInterceptors(FileInterceptor("avatar"))
  @UseGuards(JwtAuthGuard)
  async updateData(
    @Request() reqToken: TReqToken,
    @UploadedFile() avatar: TFIle,
    @Body(new ZodValidationPipe(VSUpdateStudent))
    studentData: UpdateStudentSwagger,
  ) {
      const { sub: id } = reqToken.user;
      const response = await firstValueFrom(
        this.client.send("update_student", {
          id,
          avatar,
          ...studentData,
        }),
      );
      return response;
  }

  @Delete("/:id")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete By Id" })
  @ApiResponse({
    status: 400,
    description: "User tidak ditemukan",
  })
  @UseGuards(JwtAuthGuard)
  async deleteDataById(@Param("id") id: string) {
      const response = await firstValueFrom(this.client.send("delete_student", { id }));
      return response;
  }

  @Put("/:id")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update By Id" })
  @ApiResponse({
    status: 400,
    description: "User tidak ditemukan",
  })
  @UseInterceptors(FileInterceptor("avatar"))
  @UseGuards(JwtAuthGuard)
  async updateDataById(
    @Param("id") id: string,
    @UploadedFile() avatar: TFIle,
    @Body(new ZodValidationPipe(VSUpdateStudent))
    studentData: UpdateStudentSwagger,
  ) {
      const response = await firstValueFrom(
        this.client.send("update_student", { id, avatar, ...studentData }),
      );
      return response;
  }

  @Get("/:id")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get Data By Id" })
  @ApiResponse({
    status: 400,
    description: "Data tidak ditemukan",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  @UseGuards(JwtAuthGuard)
  async getDataById(@Param("id") id: string) {
      const response = await firstValueFrom(this.client.send("update_student", { id }));
      return response;
  }
}
