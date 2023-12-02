import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateEducation } from "@uninus/api/dto";
import { PersonalService } from "@uninus/api/services";

@ApiTags("General:Personal")
@Controller()
export class PersonalController {
  constructor(private readonly appService: PersonalService) {}

  @ApiOperation({ summary: "Get Province" })
  @Get("province")
  async getProvince(@Query() query: { search: string }) {
    return await this.appService.getProvince(query);
  }

  @ApiOperation({ summary: "Get City" })
  @Get("city")
  async getCity(@Query() query: { search: string; province_id: string; id: string }) {
    return await this.appService.getCity(query);
  }

  @ApiOperation({ summary: "Get Subdistrict" })
  @Get("subdistrict")
  async getSubdistrict(@Query() query: { search: string; city_id: string; id: string }) {
    return await this.appService.getSubdistrict(query);
  }

  @ApiOperation({ summary: "Get Religion" })
  @Get("religion")
  async getReligion(@Query() query: { search: string }) {
    return await this.appService.getReligion(query);
  }

  @ApiOperation({ summary: "Get Marital Status" })
  @Get("marital-status")
  async getMaritalStatus(@Query() query: { search: string }) {
    return await this.appService.getMaritalStatus(query);
  }

  @ApiOperation({ summary: "Get Gender" })
  @Get("gender")
  async getGender(@Query() query: { search: string }) {
    return await this.appService.getGender(query);
  }

  @ApiOperation({ summary: "Get Citizenship" })
  @Get("citizenship")
  async getCitizenship(@Query() query: { search: string }) {
    return await this.appService.getCitizenship(query);
  }

  @ApiOperation({ summary: "Get Country" })
  @Get("country")
  async getCountry(@Query("search") query: { search: string; citizenship_id: string }) {
    return await this.appService.getCountry(query);
  }

  @ApiOperation({ summary: "Get Salary" })
  @Get("salary")
  async getSalary(@Query() query: { search: string }) {
    return await this.appService.getSalary(query);
  }

  @ApiOperation({ summary: "Get Occupation" })
  @Get("occupation")
  async getOccupation(@Query() query: { search: string }) {
    return await this.appService.getOccupation(query);
  }

  @ApiOperation({ summary: "Get Disabilities" })
  @Get("disabilities")
  async getDisablities(@Query() query: { search: string }) {
    return await this.appService.getDisablities(query);
  }

  @ApiOperation({ summary: "Get Year Graduate" })
  @Get("year-graduate")
  async getYearGraduate() {
    return await this.appService.getYearGraduate();
  }

  @ApiOperation({ summary: "Get Parent Status" })
  @Get("parent/status")
  async getParentStatus(@Query() query: { search: string }) {
    return await this.appService.getParentStatus(query);
  }

  @Get("parent/education")
  @ApiOperation({ summary: "Get Parent Education" })
  async getParentEducation(@Query() query: { search: string }) {
    return await this.appService.getParentEducation(query);
  }

  @ApiOperation({ summary: "Get last Education Student" })
  @Get("education")
  async getLastEducation(@Query() query: { search: string; npsn: string }) {
    return await this.appService.getLastEducation(query);
  }

  @Get("education/type")
  @ApiOperation({ summary: "Get Last Education Type" })
  async getLastEducationType(@Query() query: { degree_program_id: number; search: string }) {
    return await this.appService.getLastEducationType(query);
  }

  @ApiOperation({ summary: "Get Last Education Major" })
  @Get("education/major")
  async getLastEducationMajor(@Query() query: { education_type_id: number; search: string }) {
    return await this.appService.getLastEducationMajor(query);
  }

  @ApiOperation({ summary: "Create last Education Student" })
  @Post("education")
  async createLastEducation(@Body() payload: CreateEducation) {
    return await this.appService.createLastEducation(payload);
  }

  @ApiOperation({ summary: "Update Last Education Student" })
  @Patch("education/:id")
  async updateLastEducation(@Param("id") id: string, @Body() payload: CreateEducation) {
    return await this.appService.updateLastEducation({ id, ...payload });
  }

  @ApiOperation({ summary: "Delete Last Education Student" })
  @Delete("education/:id")
  async deleteLastEducation(@Param("id") id: string, @Body() payload: { npsn: string }) {
    return await this.appService.deleteLastEducation({ id, ...payload });
  }
}
