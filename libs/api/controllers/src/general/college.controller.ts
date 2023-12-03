import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CollegeService } from "@uninus/api/services";
import {
  ISelectDepartmentRequest,
  ISelectFacultyRequest,
  ISelectRequest,
  TCreateDepartmentRequest,
  TCreateFacultyRequest,
  TUpdateDepartmentRequest,
  TUpdateFacultyRequest,
} from "@uninus/entities";

@ApiTags("General:College")
@Controller()
export class CollegeController {
  constructor(private readonly appService: CollegeService) {}

  @ApiOperation({ summary: "Get Degree Program" })
  @Get("degree-program")
  async getDegreeProgram(@Query() query: ISelectRequest) {
    return await this.appService.getDegreeProgram(query);
  }

  @ApiOperation({ summary: "Get Faculty" })
  @Get("faculty")
  async getFaculty(@Query() query: ISelectFacultyRequest) {
    return await this.appService.getFaculty(query);
  }

  @ApiOperation({ summary: "Create new Faculty" })
  @Post("faculty")
  async createFaculty(@Body() payload: TCreateFacultyRequest) {
    return await this.appService.createFaculty(payload);
  }

  @ApiOperation({ summary: "Update faculty" })
  @Patch("faculty/:id")
  async updateFaculty(@Param("id") id: number, @Body() payload: TUpdateFacultyRequest) {
    return await this.appService.updateFaculty({ id, ...payload });
  }

  @Delete("faculty/:id")
  @ApiOperation({ summary: "Delete Faculty" })
  async deleteFaculty(@Param("id") id: number) {
    return await this.appService.deleteFaculty({ id });
  }

  @ApiOperation({ summary: "Get Department" })
  @Get("department")
  async getDepartment(@Query() query: ISelectDepartmentRequest) {
    return await this.appService.getDepartment(query);
  }

  @ApiOperation({ summary: "Create new Department" })
  @Post("department")
  async createDepartment(@Body() payload: TCreateDepartmentRequest) {
    return await this.appService.createDepartment(payload);
  }

  @ApiOperation({ summary: "Update Department" })
  @Patch("department/:id")
  async updateDepartment(@Param("id") id: number, @Body() payload: TUpdateDepartmentRequest) {
    return await this.appService.updateDepartment({ id, ...payload });
  }

  @Delete("department/:id")
  @ApiOperation({ summary: "Delete Department" })
  async deleteDepartment(@Param("id") id: number) {
    return await this.appService.deleteDepartment({ id });
  }
}
