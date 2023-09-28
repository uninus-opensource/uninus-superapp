import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  Inject,
  UseFilters,
  Patch,
  UsePipes,
} from "@nestjs/common";
import { VSRegistrationNumber } from "@uninus/entities";
import { TReqToken, VSUpdateStudent } from "@uninus/entities";
import { JwtAuthGuard } from "@uninus/api/guard";
import { ZodValidationPipe } from "@uninus/api/validator";
import { GraduationStatusDto, UpdateStudentDto } from "@uninus/api/dto";
import {
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiOperation,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, firstValueFrom, throwError } from "rxjs";
import { RpcExceptionToHttpExceptionFilter } from "@uninus/api/filter";

@Controller("student")
@ApiTags("Student")
export class StudentController {
  constructor(@Inject("STUDENT_SERVICE") private readonly client: ClientProxy) {}

  @ApiOperation({ summary: "Get Graduation Status" })
  @ApiResponse({
    status: 400,
    description: "User tidak ditemukan",
  })
  @Post("/graduation-status")
  @UsePipes(new ZodValidationPipe(VSRegistrationNumber))
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async graduationStatus(@Body() payload: GraduationStatusDto) {
    const response = await firstValueFrom(
      this.client
        .send("get_graduation_status", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );

    return response;
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get Data Student" })
  @ApiResponse({
    status: 400,
    description: "Data tidak ditemukan",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async getData(@Request() reqToken: TReqToken) {
    const { sub: id } = reqToken.user;
    const response = await firstValueFrom(
      this.client
        .send("get_student", { id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Update Data Student" })
  @ApiResponse({
    status: 400,
    description: "User tidak ditemukan",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  @Patch()
  @UsePipes(new ZodValidationPipe(VSUpdateStudent))
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async updateData(
    @Request() reqToken: TReqToken,
    @Body()
    studentData: UpdateStudentDto,
  ) {
    const { sub: id } = reqToken.user;
    const response = await firstValueFrom(
      this.client
        .send("update_student", {
          id,
          ...studentData,
        })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete By Id" })
  @ApiResponse({
    status: 400,
    description: "User tidak ditemukan",
  })
  @Delete("/:id")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async deleteDataById(@Param("id") id: string) {
    const response = await firstValueFrom(
      this.client
        .send("delete_student", { id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Update By Id" })
  @ApiResponse({
    status: 400,
    description: "User tidak ditemukan",
  })
  @Patch("/:id")
  @UsePipes(new ZodValidationPipe(VSUpdateStudent))
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async updateDataById(
    @Param("id") id: string,
    @Body()
    studentData: UpdateStudentDto,
  ) {
    const response = await firstValueFrom(
      this.client
        .send("update_student", { id, ...studentData })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Get Data By Id" })
  @ApiResponse({
    status: 400,
    description: "Data tidak ditemukan",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  @Get("/:id")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async getDataById(@Param("id") id: string) {
    const response = await firstValueFrom(
      this.client
        .send("get_student", { id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
}
