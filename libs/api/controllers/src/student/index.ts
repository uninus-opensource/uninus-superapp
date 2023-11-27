import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  Patch,
  Query,
} from "@nestjs/common";
import {
  EAppsOrigin,
  IUpdateStudentRequest,
  TGraduationStatusRequest,
  VSRegistrationNumber,
} from "@uninus/entities";
import { TReqToken, VSUpdateStudent } from "@uninus/entities";
import { JwtAuthGuard, PermissionGuard } from "@uninus/api/guard";
import { ZodValidationPipe } from "@uninus/api/pipes";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
  ApiHeader,
  ApiBody,
} from "@nestjs/swagger";
import { StudentService } from "@uninus/api/services";
import { GraduationStatusDto } from "@uninus/api/dto";

@ApiTags("Student")
@ApiBearerAuth("bearer")
@ApiHeader({
  name: "app-origin",
  description: "Application Origin",
  required: true,
})
@Controller("student")
export class StudentController {
  constructor(private readonly appService: StudentService) {}

  @ApiOperation({ summary: "Get Payment Obligations Student" })
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  @Get("payment-obligations")
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBUSER]))
  async getPaymentObligations(@Query("search") search: string, @Request() reqToken: TReqToken) {
    const { sub: userId } = reqToken.user;
    return await this.appService.getPaymentObligations({ userId, search });
  }

  @ApiOperation({ summary: "Get Graduation Status" })
  @ApiBody({ type: GraduationStatusDto })
  @Post("/graduation-status")
  async graduationStatus(
    @Body(new ZodValidationPipe(VSRegistrationNumber)) payload: TGraduationStatusRequest,
  ) {
    return await this.appService.graduationStatus(payload);
  }

  @ApiOperation({ summary: "Get Data Student" })
  @Get("/me")
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBUSER]))
  async getDataStudent(@Request() reqToken: TReqToken) {
    const { sub: id } = reqToken.user;
    return await this.appService.getDataStudent({ id });
  }

  @ApiOperation({ summary: "Update Data Student" })
  @Patch()
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBUSER]))
  async updateDataStudent(
    @Request() reqToken: TReqToken,
    @Body(new ZodValidationPipe(VSUpdateStudent))
    studentData: IUpdateStudentRequest,
  ) {
    const { sub: id } = reqToken.user;
    return await this.appService.updateDataStudent({ id, ...studentData });
  }

  @ApiOperation({ summary: "Delete By Id" })
  @Delete("/:id")
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBADMIN]))
  async deleteDataStudent(@Param("id") id: string) {
    return await this.appService.deleteDataStudent({ id });
  }

  @ApiOperation({ summary: "Update By Id" })
  @Patch("/:id")
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBADMIN]))
  async updateDataStudentById(
    @Param("id") id: string,
    @Body()
    studentData: IUpdateStudentRequest,
  ) {
    return await this.appService.updateDataStudentById({ id, ...studentData });
  }

  @ApiOperation({ summary: "Get Data By Id" })
  @Get("/:id")
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBADMIN]))
  async getDataStudentByid(@Param("id") id: string) {
    return await this.appService.getDataStudentByid({ id });
  }
}
