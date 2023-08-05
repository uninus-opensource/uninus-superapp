import { Controller, Get, Query, Inject, BadRequestException } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from "@nestjs/swagger";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Controller()
@ApiTags("Select")
export class SelectController {
  constructor(@Inject("PMB_SERVICE") private readonly client: ClientProxy) {}
  @Get("province")
  @ApiOperation({ summary: "Get Province" })
  @ApiResponse({
    status: 400,
    description: "Location Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  async getProvince(@Query("search") search: string) {
    try {
      const response = await firstValueFrom(this.client.send("get_province", { search }));
      return response;
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Get("city")
  @ApiOperation({ summary: "Get City" })
  @ApiResponse({
    status: 400,
    description: "Location Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "province_id", required: false })
  async getCity(@Query("province_id") province_id: string, @Query("search") search: string) {
    try {
      const response = await firstValueFrom(
        this.client.send("get_city", { province_id, search }),
      );
      return response;
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Get("sub-district")
  @ApiOperation({ summary: "Get Sub District" })
  @ApiResponse({
    status: 400,
    description: "Location Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "city_id", required: false })
  async getSubDistrict(@Query("city_id") city_id: string, @Query("search") search: string) {
    try {
      const response = await firstValueFrom(
        this.client.send("get_subdistrict", { city_id, search }),
      );
      return response;
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Get("degree-program")
  @ApiOperation({ summary: "Get Degree Program" })
  @ApiResponse({
    status: 400,
    description: "Degree Program Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  async getDegreeProgram(@Query("search") search: string) {
    try {
      const response = await firstValueFrom(this.client.send("get_degree", { search }));
      return response;
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Get("faculty")
  @ApiOperation({ summary: "Get Faculty" })
  @ApiResponse({
    status: 400,
    description: "Faculty Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "degree_program_id", required: false })
  async getFaculty(
    @Query("search") search: string,
    @Query("degree_program_id") degree_program_id: string,
  ) {
    try {
      const response = await firstValueFrom(
        this.client.send("get_faculty", { search, degree_program_id }),
      );
      return response;
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Get("department")
  @ApiOperation({ summary: "Get Program Studi" })
  @ApiResponse({
    status: 400,
    description: "Department Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "faculty_id", required: false })
  async getDepartment(@Query("search") search: string, @Query("faculty_id") faculty_id: string) {
    try {
      const response = await firstValueFrom(
        this.client.send("get_department", { search, faculty_id }),
      );
      return response;
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Get("religion")
  @ApiOperation({ summary: "Get Religion" })
  @ApiResponse({
    status: 400,
    description: "Religion Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  async getReligion(@Query("search") search: string) {
    try {
      const response = await firstValueFrom(this.client.send("get_religion", { search }));
      return response;
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Get("marital-status")
  @ApiOperation({ summary: "Get Marital Status" })
  @ApiResponse({
    status: 400,
    description: "Marital Status Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  async getMaritalStatus(@Query("search") search: string) {
    try {
      const response = await firstValueFrom(this.client.send("get_marital_status", { search }));
      return response;
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Get("gender")
  @ApiOperation({ summary: "Get Gender" })
  @ApiResponse({
    status: 400,
    description: "Gender Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  async getGender(@Query("search") search: string) {
    try {
      const response = await firstValueFrom(this.client.send("get_gender", { search }));
      return response;
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Get("citizenship")
  @ApiOperation({ summary: "Get Citizenship" })
  @ApiResponse({
    status: 400,
    description: "Citizenship Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  async getCitizenship(@Query("search") search: string) {
    try {
      const response = await firstValueFrom(this.client.send("get_citizenship", { search }));
      return response;
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Get("selection-path")
  @ApiOperation({ summary: "Get Selection Path" })
  @ApiResponse({
    status: 400,
    description: "Selection Path Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  async getSelectionPath(@Query("search") search: string) {
    try {
      const response = await firstValueFrom(this.client.send("get_selection_path", { search }));
      return response;
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Get("salary")
  @ApiOperation({ summary: "Get Salary" })
  @ApiResponse({
    status: 400,
    description: "Salary Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  async getSalary(@Query("search") search: string) {
    try {
      const response = await firstValueFrom(this.client.send("get_salary", { search }));
      return response;
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Get("education-history")
  @ApiOperation({ summary: "Get Bachelor Degree" })
  @ApiResponse({
    status: 400,
    description: "Education History Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  async getEducationHistory(@Query("search") search: string) {
    try {
      const response = await firstValueFrom(
        this.client.send("get_educational_history", { search }),
      );
      return response;
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Get("country")
  @ApiOperation({ summary: "Get Country" })
  @ApiResponse({
    status: 400,
    description: "Country Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  async getCountry(@Query("search") search: string) {
    try {
      const response = await firstValueFrom(this.client.send("get_country", { search }));
      return response;
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Get("occupation")
  @ApiOperation({ summary: "Get Occupation" })
  @ApiResponse({
    status: 400,
    description: "Occupation Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  async getOccupation(@Query("search") search: string) {
    try {
      const response = await firstValueFrom(this.client.send("get_occupation", { search }));
      return response;
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Get("disabilities")
  @ApiOperation({ summary: "Get Disabilities" })
  @ApiResponse({
    status: 400,
    description: "Disabilities Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  async getDisablities(@Query("search") search: string) {
    try {
      const response = await firstValueFrom(this.client.send("get_dissabilities", { search }));
      return response;
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }
}
