import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import {
  CreateLastEducationDto,
  GetCityDto,
  GetCountryDto,
  GetLastEducationDto,
  GetLastEducationTypeDto,
  GetSubDistrictDto,
  SelectOptionDto,
  UpdateLastEducationDto,
} from "@uninus/api/dto";
import { PersonalService } from "@uninus/api/services";
import {
  ICityRequest,
  ICountryRequest,
  IEducationMajorRequest,
  IEducationTypeRequest,
  ISelectEducationHistoryRequest,
  ISelectRequest,
  ISubDistrictRequest,
  TCreateEducationRequest,
  TDeleteEducationRequest,
  TUpdateEducationRequest,
} from "@uninus/entities";

@ApiTags("General:Personal")
@Controller()
export class PersonalController {
  constructor(private readonly appService: PersonalService) {}

  @ApiOperation({ summary: "Get Province" })
  @ApiQuery({ type: SelectOptionDto })
  @Get("province")
  async getProvince(@Query() query: ISelectRequest) {
    return await this.appService.getProvince(query);
  }

  @ApiOperation({ summary: "Get City" })
  @ApiQuery({ type: GetCityDto })
  @Get("city")
  async getCity(@Query() query: ICityRequest) {
    return await this.appService.getCity(query);
  }

  @ApiOperation({ summary: "Get Subdistrict" })
  @ApiQuery({ type: GetSubDistrictDto })
  @Get("subdistrict")
  async getSubdistrict(@Query() query: ISubDistrictRequest) {
    return await this.appService.getSubdistrict(query);
  }

  @ApiOperation({ summary: "Get Religion" })
  @ApiQuery({ type: SelectOptionDto })
  @Get("religion")
  async getReligion(@Query() query: ISelectRequest) {
    return await this.appService.getReligion(query);
  }

  @ApiOperation({ summary: "Get Marital Status" })
  @ApiQuery({ type: SelectOptionDto })
  @Get("marital-status")
  async getMaritalStatus(@Query() query: ISelectRequest) {
    return await this.appService.getMaritalStatus(query);
  }

  @ApiOperation({ summary: "Get Gender" })
  @ApiQuery({ type: SelectOptionDto })
  @Get("gender")
  async getGender(@Query() query: ISelectRequest) {
    return await this.appService.getGender(query);
  }

  @ApiOperation({ summary: "Get Citizenship" })
  @ApiQuery({ type: SelectOptionDto })
  @Get("citizenship")
  async getCitizenship(@Query() query: ISelectRequest) {
    return await this.appService.getCitizenship(query);
  }

  @ApiOperation({ summary: "Get Country" })
  @ApiQuery({ type: GetCountryDto })
  @Get("country")
  async getCountry(@Query("search") query: ICountryRequest) {
    return await this.appService.getCountry(query);
  }

  @ApiOperation({ summary: "Get Salary" })
  @ApiQuery({ type: SelectOptionDto })
  @Get("salary")
  async getSalary(@Query() query: ISelectRequest) {
    return await this.appService.getSalary(query);
  }

  @ApiOperation({ summary: "Get Occupation" })
  @ApiQuery({ type: SelectOptionDto })
  @Get("occupation")
  async getOccupation(@Query() query: ISelectRequest) {
    return await this.appService.getOccupation(query);
  }

  @ApiOperation({ summary: "Get Disabilities" })
  @ApiQuery({ type: SelectOptionDto })
  @Get("disabilities")
  async getDisablities(@Query() query: ISelectRequest) {
    return await this.appService.getDisablities(query);
  }

  @ApiOperation({ summary: "Get Year Graduate" })
  @Get("year-graduate")
  async getYearGraduate() {
    return await this.appService.getYearGraduate();
  }

  @ApiOperation({ summary: "Get Parent Status" })
  @ApiQuery({ type: SelectOptionDto })
  @Get("parent/status")
  async getParentStatus(@Query() query: ISelectRequest) {
    return await this.appService.getParentStatus(query);
  }

  @ApiOperation({ summary: "Get Parent Education" })
  @ApiQuery({ type: SelectOptionDto })
  @Get("parent/education")
  async getParentEducation(@Query() query: ISelectRequest) {
    return await this.appService.getParentEducation(query);
  }

  @ApiOperation({ summary: "Get last Education Student" })
  @ApiQuery({ type: GetLastEducationDto })
  @Get("education")
  async getLastEducation(@Query() query: ISelectEducationHistoryRequest) {
    return await this.appService.getLastEducation(query);
  }

  @ApiOperation({ summary: "Get Last Education Type" })
  @ApiQuery({ type: GetLastEducationTypeDto })
  @Get("education/type")
  async getLastEducationType(@Query() query: IEducationTypeRequest) {
    return await this.appService.getLastEducationType(query);
  }

  @ApiOperation({ summary: "Get Last Education Major" })
  @ApiQuery({ type: GetLastEducationDto })
  @Get("education/major")
  async getLastEducationMajor(@Query() query: IEducationMajorRequest) {
    return await this.appService.getLastEducationMajor(query);
  }

  @ApiOperation({ summary: "Create last Education Student" })
  @ApiBody({ type: CreateLastEducationDto })
  @Post("education")
  async createLastEducation(@Body() payload: TCreateEducationRequest) {
    return await this.appService.createLastEducation(payload);
  }

  @ApiOperation({ summary: "Update Last Education Student" })
  @ApiParam({ name: "id", type: "integer", required: true })
  @ApiBody({ type: UpdateLastEducationDto })
  @Patch("education/:id")
  async updateLastEducation(@Param("id") id: number, @Body() payload: TUpdateEducationRequest) {
    return await this.appService.updateLastEducation({ id, ...payload });
  }

  @ApiOperation({ summary: "Delete Last Education Student" })
  @ApiParam({ name: "id", type: "integer", required: true })
  @Delete("education/:id")
  async deleteLastEducation(@Param("id") id: number, @Body() payload: TDeleteEducationRequest) {
    return await this.appService.deleteLastEducation({ id, ...payload });
  }
}
