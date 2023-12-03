import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { PMBService } from "@uninus/api/services";
import {
  IInterestDepartment,
  IInterestEducationPrograms,
  IRegistransRequest,
  ISelectRequest,
  ISelectionRequest,
  TCreateQuestionRequest,
  TCreateScholarshipRequest,
  TCreateSelectionPathRequest,
  TUpdateQuestionRequest,
  TUpdateScholarshipRequest,
  TUpdateSelectionPathRequest,
} from "@uninus/entities";

@ApiTags("General:PMB")
@Controller()
export class PMBController {
  constructor(private readonly appService: PMBService) {}
  @ApiOperation({ summary: "Get Scholarship" })
  @Get("scholarship")
  async getScholarship(@Query() query: ISelectRequest) {
    return await this.appService.getScholarship(query);
  }

  @ApiOperation({ summary: "Create new Scholarship" })
  @Post("scholarship")
  async createScholarship(@Body() payload: TCreateScholarshipRequest) {
    return await this.appService.createScholarship(payload);
  }

  @ApiOperation({ summary: "Update Scholarship" })
  @Patch("scholarship/:id")
  async updateScholarship(@Param("id") id: number, @Body() payload: TUpdateScholarshipRequest) {
    return await this.appService.updateScholarship({ id, ...payload });
  }

  @ApiOperation({ summary: "Delete Scholarship" })
  @Delete("scholarship/:id")
  async deleteScholarship(@Param("id") id: number) {
    return await this.appService.deleteScholarship({ id });
  }

  @ApiOperation({ summary: "Get Selection Path" })
  @Get("path/selection")
  async getSelectionPath(@Query() query: ISelectionRequest) {
    return await this.appService.getSelectionPath(query);
  }

  @ApiOperation({ summary: "Create new Selection path" })
  @Post("path/selection")
  async createSelectionPath(@Body() payload: TCreateSelectionPathRequest) {
    return await this.appService.createSelectionPath(payload);
  }

  @ApiOperation({ summary: "Update Selection Path" })
  @Patch("path/selection/:id")
  async updateSelectionPath(@Param("id") id: number, @Body() payload: TUpdateSelectionPathRequest) {
    return await this.appService.updateSelectionPath({ id, ...payload });
  }

  @ApiOperation({ summary: "Delete Selection path" })
  @Delete("selection/:id")
  async deleteSelectionpath(@Param("id") id: number) {
    return await this.appService.deleteSelectionpath({ id });
  }

  @ApiOperation({ summary: "Get Registration Path" })
  @Get("path/registration")
  async getRegistrationPath(@Query() query: ISelectionRequest) {
    return await this.appService.getRegistrationPath(query);
  }
  @ApiOperation({ summary: "Get Total Registrans" })
  @Get("registrans")
  async getRegistrans(@Query() query: IRegistransRequest) {
    return await this.appService.getRegistrans(query);
  }

  @ApiOperation({ summary: "Get Total Interest Education Program" })
  @Get("interest/programs")
  async getInterestPrograms(@Query() query: IInterestEducationPrograms) {
    return await this.appService.getInterestPrograms(query);
  }

  @ApiOperation({ summary: "Get Total Interest Department" })
  @Get("interest/department")
  async getInterestDepartment(@Query() query: IInterestDepartment) {
    return await this.appService.getInterestDepartment(query);
  }

  @Get("registration-status")
  @ApiOperation({ summary: "Get registration status" })
  async getRegistrationStatus(@Query() query: ISelectRequest) {
    return await this.appService.getRegistrationStatus(query);
  }

  @ApiOperation({ summary: "Get Admission Questions" })
  @Get("admission-test")
  async getAdmissionTest() {
    return await this.appService.getAdmissionTest();
  }

  @ApiOperation({ summary: "Create Admission Questions" })
  @Post("admission-test")
  async createAdmissionTest(@Body() payload: TCreateQuestionRequest) {
    return await this.appService.createAdmissionTest(payload);
  }

  @ApiOperation({ summary: "Update Admission Questions" })
  @Patch("admission-test/:id")
  async updateAdmissionTest(@Param("id") id: number, @Body() payload: TUpdateQuestionRequest) {
    return await this.appService.updateAdmissionTest({ id, ...payload });
  }

  @ApiOperation({ summary: "Delete Admission Questions" })
  @Delete("admission-test/:id")
  async deleteAdmissionTest(@Param("id") id: number) {
    return await this.appService.deleteAdmissionTest({ id });
  }
}
