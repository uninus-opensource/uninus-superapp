import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateDepartment, CreateFaculty } from "@uninus/api/dto";
import { CollegeService } from "@uninus/api/services";

@ApiTags("General:College")
@Controller()
export class CollegeController {
  constructor(private readonly appService: CollegeService) {}

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
}
