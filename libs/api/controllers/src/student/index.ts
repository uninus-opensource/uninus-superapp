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
  Query,
} from "@nestjs/common";
import { EAppsOrigin, VSRegistrationNumber } from "@uninus/entities";
import { TReqToken, VSUpdateStudent } from "@uninus/entities";
import { JwtAuthGuard, PermissionGuard } from "@uninus/api/guard";
import { ZodValidationPipe } from "@uninus/api/pipes";
import { GraduationStatusDto, UpdateStudentDto } from "@uninus/api/dto";
import {
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiHeader,
  ApiQuery,
} from "@nestjs/swagger";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, firstValueFrom, throwError } from "rxjs";
import { RpcExceptionToHttpExceptionFilter } from "@uninus/api/pipes";

@Controller("student")
@ApiTags("Student")
export class StudentController {
  constructor(@Inject("STUDENT_SERVICE") private readonly client: ClientProxy) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: "Get Payment Obligations Student" })
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
    required: true,
  })
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
  @ApiResponse({
    status: 400,
    description: "User tidak ditemukan",
  })
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
  })
  @Post("/graduation-status")
  @UsePipes(new ZodValidationPipe(VSRegistrationNumber))
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @UseGuards(PermissionGuard([EAppsOrigin.PMBUSER]))
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
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
  })
  @Get()
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
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

  @ApiBearerAuth()
  @ApiOperation({ summary: "Update Data Student" })
  @ApiResponse({
    status: 400,
    description: "User tidak ditemukan",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
  })
  @Patch()
  @UsePipes(new ZodValidationPipe(VSUpdateStudent))
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBUSER]))
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
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
  })
  @Delete("/:id")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBADMIN]))
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
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
  })
  @Patch("/:id")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBADMIN]))
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
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
  })
  @Get("/:id")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
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
