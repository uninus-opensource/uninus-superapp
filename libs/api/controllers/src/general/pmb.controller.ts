import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  CreateDepartment,
  CreateFaculty,
  CreateScholarship,
  CreateSelectionPath,
  createQuestion,
} from "@uninus/api/dto";
import { PMBService } from "@uninus/api/services";

@ApiTags("General:PMB")
@Controller()
export class PMBController {
  constructor(private readonly appService: PMBService) {}

  @ApiOperation({ summary: "Get Scholarship" })
  @Get("scholarship")
  async getScholarship(@Query() query: { search: string }) {
    return await this.appService.getScholarship(query);
  }

  @ApiOperation({ summary: "Create new Scholarship" })
  @Post("scholarship")
  async createScholarship(@Body() payload: CreateScholarship) {
    return await this.appService.createScholarship(payload);
  }

  @ApiOperation({ summary: "Update Scholarship" })
  @Patch("scholarship/:id")
  async updateScholarship(@Param("id") id: number, @Body() payload: CreateScholarship) {
    return await this.appService.updateScholarship({ id, ...payload });
  }

  @ApiOperation({ summary: "Delete Scholarship" })
  @Delete("scholarship/:id")
  async deleteScholarship(@Param("id") id: number) {
    return await this.appService.deleteScholarship({ id });
  }

  @ApiOperation({ summary: "Get Selection Path" })
  @Get("path/selection")
  async getSelectionPath(@Query() query: { search: string; degree_program_id: string }) {
    return await this.appService.getSelectionPath(query);
  }

  @ApiOperation({ summary: "Create new Selection path" })
  @Post("path/selection")
  async createSelectionPath(@Body() payload: CreateSelectionPath) {
    return await this.appService.createSelectionPath(payload);
  }

  @ApiOperation({ summary: "Update Selection Path" })
  @Patch("path/selection/:id")
  async updateSelectionPath(@Param("id") id: number, @Body() payload: CreateSelectionPath) {
    return await this.appService.updateSelectionPath({ id, ...payload });
  }

  @ApiOperation({ summary: "Delete Selection path" })
  @Delete("selection/:id")
  async deleteSelectionpath(@Param("id") id: number) {
    return await this.appService.deleteSelectionpath({ id });
  }

  @ApiOperation({ summary: "Get Registration Path" })
  @Get("path/registration")
  async getRegistrationPath(@Query() query: { search: string; id: string }) {
    return await this.appService.getRegistrationPath(query);
  }

  @ApiOperation({ summary: "Get Degree Program" })
  @Get("degree-program")
  async getDegreeProgram(@Query() query: { search: string }) {
    return await this.appService.getDegreeProgram(query);
  }

  @ApiOperation({ summary: "Get Faculty" })
  @Get("faculty")
  async getFaculty(@Query() query: { search: string; degree_program_id: string }) {
    return await this.appService.getFaculty(query);
  }

  @ApiOperation({ summary: "Create new Faculty" })
  @Post("faculty")
  async createFaculty(@Body() payload: CreateFaculty) {
    return await this.appService.createFaculty(payload);
  }

  @ApiOperation({ summary: "Update faculty" })
  @Patch("faculty/:id")
  async updateFaculty(@Param("id") id: number, @Body() payload: CreateFaculty) {
    return await this.appService.updateFaculty({ id, ...payload });
  }

  @Delete("faculty/:id")
  @ApiOperation({ summary: "Delete Faculty" })
  async deleteFaculty(@Param("id") id: number) {
    return await this.appService.deleteFaculty({ id });
  }

  @ApiOperation({ summary: "Get Department" })
  @Get("department")
  async getDepartment(
    @Query() query: { search: string; degree_program_id: string; faculty_id: string },
  ) {
    return await this.appService.getDepartment(query);
  }

  @ApiOperation({ summary: "Create new Department" })
  @Post("department")
  async createDepartment(@Body() payload: CreateDepartment) {
    return await this.appService.createDepartment(payload);
  }

  @ApiOperation({ summary: "Update Department" })
  @Patch("department/:id")
  async updateDepartment(@Param("id") id: number, @Body() payload: CreateDepartment) {
    return await this.appService.updateDepartment({ id, ...payload });
  }

  @Delete("department/:id")
  @ApiOperation({ summary: "Delete Department" })
  async deleteDepartment(@Param("id") id: number) {
    return await this.appService.deleteDepartment({ id });
  }

  @ApiOperation({ summary: "Get Total Registrans" })
  @Get("registrans")
  async getRegistrans(
    @Query() query: { end_date: string; start_date: string; filter_type: string },
  ) {
    return await this.appService.getRegistrans(query);
  }

  @ApiOperation({ summary: "Get Total Interest Education Program" })
  @Get("interest/programs")
  async getInterestPrograms(@Query() query: { filter_type: string }) {
    return await this.appService.getInterestPrograms(query);
  }

  @ApiOperation({ summary: "Get Total Interest Department" })
  @Get("interest/department")
  async getInterestDepartment(@Query() query: { filter_type: string; degree_program_id: string }) {
    return await this.appService.getInterestDepartment(query);
  }

  @Get("registration-status")
  @ApiOperation({ summary: "Get registration status" })
  async getRegistrationStatus(@Query() query: { id: string; search: string }) {
    return await this.appService.getRegistrationStatus(query);
  }

  @ApiOperation({ summary: "Get Admission Questions" })
  @Get("admission-test")
  async getAdmissionQuestions() {
    return await this.appService.getAdmissionQuestions();
  }

  @ApiOperation({ summary: "Create Admission Questions" })
  @Post("admission-test")
  async createAdmissionQuestions(@Body() payload: createQuestion) {
    return await this.appService.createAdmissionQuestions(payload);
  }

  @ApiOperation({ summary: "Update Admission Questions" })
  @Patch("admission-test/:id")
  async updateAdmissionQuestions(@Param("id") id: number, @Body() payload: createQuestion) {
    return await this.appService.updateAdmissionQuestions({ id, ...payload });
  }

  @ApiOperation({ summary: "Delete Admission Questions" })
  @Delete("admission-test/:id")
  async deleteAdmissionQuestions(@Param("id") id: number) {
    return await this.appService.deleteAdmissionQuestions({ id });
  }
}
