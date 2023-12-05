import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import {
  CreateDepartmentDto,
  CreateFacultyDto,
  GetDepartmentDto,
  GetFacultyDto,
  SelectOptionDto,
  UpdateDepartmentDto,
  UpdateFacultyDto,
} from "@uninus/api/dto";
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
  @ApiQuery({ type: SelectOptionDto })
  @Get("degree-program")
  async getDegreeProgram(@Query() query: ISelectRequest) {
    return await this.appService.getDegreeProgram(query);
  }

  @ApiOperation({ summary: "Get Faculty" })
  @ApiQuery({ type: GetFacultyDto })
  @Get("faculty")
  async getFaculty(@Query() query: ISelectFacultyRequest) {
    return await this.appService.getFaculty(query);
  }

  @ApiOperation({ summary: "Create new Faculty" })
  @ApiBody({ type: CreateFacultyDto })
  @Post("faculty")
  async createFaculty(@Body() payload: TCreateFacultyRequest) {
    return await this.appService.createFaculty(payload);
  }

  @ApiOperation({ summary: "Update faculty" })
  @ApiBody({ type: UpdateFacultyDto })
  @ApiParam({ name: "id", type: "integer", required: true })
  @Patch("faculty/:id")
  async updateFaculty(@Param("id") id: number, @Body() payload: TUpdateFacultyRequest) {
    return await this.appService.updateFaculty({ id, ...payload });
  }

  @ApiOperation({ summary: "Delete Faculty" })
  @ApiParam({ name: "id", type: "integer", required: true })
  @Delete("faculty/:id")
  async deleteFaculty(@Param("id") id: number) {
    return await this.appService.deleteFaculty({ id });
  }

  @ApiOperation({ summary: "Get Department" })
  @ApiQuery({ type: GetDepartmentDto })
  @Get("department")
  async getDepartment(@Query() query: ISelectDepartmentRequest) {
    return await this.appService.getDepartment(query);
  }

  @ApiOperation({ summary: "Create new Department" })
  @ApiBody({ type: CreateDepartmentDto })
  @Post("department")
  async createDepartment(@Body() payload: TCreateDepartmentRequest) {
    return await this.appService.createDepartment(payload);
  }

  @ApiOperation({ summary: "Update Department" })
  @ApiBody({ type: UpdateDepartmentDto })
  @ApiParam({ name: "id", type: "integer", required: true })
  @Patch("department/:id")
  async updateDepartment(@Param("id") id: number, @Body() payload: TUpdateDepartmentRequest) {
    return await this.appService.updateDepartment({ id, ...payload });
  }

  @ApiOperation({ summary: "Delete Department" })
  @ApiParam({ name: "id", type: "integer", required: true })
  @Delete("department/:id")
  async deleteDepartment(@Param("id") id: number) {
    return await this.appService.deleteDepartment({ id });
  }
}
