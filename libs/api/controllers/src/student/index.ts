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
  Patch,
  Query,
  BadRequestException,
} from "@nestjs/common";
import { EAppsOrigin, VSRegistrationNumber, emailTemplateSelection } from "@uninus/entities";
import { TReqToken, VSUpdateStudent } from "@uninus/entities";
import { JwtAuthGuard, PermissionGuard } from "@uninus/api/guard";
import { ZodValidationPipe } from "@uninus/api/pipes";
import { GraduationStatusDto, UpdateStudentDto } from "@uninus/api/dto";
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, firstValueFrom, throwError } from "rxjs";

@Controller("student")
@ApiTags("Student")
export class StudentController {
  constructor(@Inject("STUDENT_SERVICE") private readonly client: ClientProxy) {}

  @ApiOperation({ summary: "Get Payment Obligations Student" })
  @ApiBearerAuth("bearer")
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  @Get("payment-obligations")
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBUSER]))
  async getPaymentObligations(
    @Query("id") id: number,
    @Query("search") search: string,
    @Request() reqToken: TReqToken,
  ) {
    const { sub: userId } = reqToken.user;
    const response = await firstValueFrom(
      this.client
        .send("get_payment_obligations", { userId, id, search })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @ApiOperation({ summary: "Get Graduation Status" })
  @Post("/graduation-status")
  @UseGuards(PermissionGuard([EAppsOrigin.PMBUSER]))
  async graduationStatus(
    @Body(new ZodValidationPipe(VSRegistrationNumber)) payload: GraduationStatusDto,
  ) {
    const response = await firstValueFrom(
      this.client
        .send("get_graduation_status", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );

    return response;
  }

  @ApiOperation({ summary: "Get Data Student" })
  @ApiBearerAuth("bearer")
  @Get()
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBUSER]))
  async getData(@Request() reqToken: TReqToken) {
    const { sub: id } = reqToken.user;
    const response = await firstValueFrom(
      this.client
        .send("get_student", { id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @ApiOperation({ summary: "Update Data Student" })
  @ApiBearerAuth("bearer")
  @Patch()
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBUSER]))
  async updateData(
    @Request() reqToken: TReqToken,
    @Body(new ZodValidationPipe(VSUpdateStudent))
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

  @ApiOperation({ summary: "Delete By Id" })
  @ApiBearerAuth("bearer")
  @Delete("/:id")
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBADMIN]))
  async deleteDataById(@Param("id") id: string) {
    const response = await firstValueFrom(
      this.client
        .send("delete_student", { id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @ApiOperation({ summary: "Update By Id" })
  @ApiBearerAuth("bearer")
  @Patch("/:id")
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBADMIN]))
  async updateDataById(
    @Param("id") id: string,
    @Body()
    studentData: UpdateStudentDto,
  ) {
    const updateStudent = await firstValueFrom(
      this.client
        .send("update_student", { id, ...studentData })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );

    const html =
      studentData?.registration_status_id &&
      emailTemplateSelection(updateStudent.fullname, updateStudent?.registration_status);

    const sendEmail =
      studentData?.registration_status_id &&
      (await firstValueFrom(
        this.client
          .send("send_email", {
            email: updateStudent.email,
            subject: "Hasil Seleksi Penerimaan Mahasiswa Baru",
            html,
          })
          .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
      ));

    if (studentData?.registration_status_id && !sendEmail) {
      throw new BadRequestException("Gagal mengirimkan email");
    }
    return studentData?.registration_status_id
      ? { message: "Berhasil mengirimkan email" }
      : updateStudent;
  }

  @ApiOperation({ summary: "Get Data By Id" })
  @ApiBearerAuth("bearer")
  @Get("/:id")
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBADMIN]))
  async getDataById(@Param("id") id: string) {
    const response = await firstValueFrom(
      this.client
        .send("get_student", { id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
}
