import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  BadRequestException,
  Inject,
} from "@nestjs/common";
import { TFIle } from "@uninus/entities";
import { FileInterceptor } from "@nestjs/platform-express";
import { TReqToken, VSUpdateStudent } from "@uninus/entities";
import { JwtAuthGuard } from "@uninus/api/guard";
import { ZodValidationPipe } from "@uninus/api/validator";
import { UpdateStudentSwagger } from "@uninus/api/services";
import {
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiOperation,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Controller("student")
@ApiTags("Student")
export class StudentController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly client: ClientProxy
  ) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get Data Student" })
  @ApiResponse({
    status: 400,
    description: "Data tidak ditemukan",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  @UseGuards(JwtAuthGuard)
  async getData(@Request() reqToken: TReqToken) {
    try {
      const { sub: id } = reqToken.user;
      const response = await firstValueFrom(this.client.send("get_student",{ id }))
      return response
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update Data Student" })
  @ApiResponse({
    status: 400,
    description: "User tidak ditemukan",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  @UseInterceptors(FileInterceptor("avatar"))
  @UseGuards(JwtAuthGuard)
  async updateData(
    @Request() reqToken: TReqToken,
    @UploadedFile() avatar: TFIle,
    @Body(new ZodValidationPipe(VSUpdateStudent))
    studentData: UpdateStudentSwagger,
  ) {
    try {
      const { sub: id } = reqToken.user;
      const response = await firstValueFrom(this.client.send("update_student",{
        id,
        avatar,
        ...studentData
      }))
      return response
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Delete("/:id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete By Id" })
  @ApiResponse({
    status: 400,
    description: "User tidak ditemukan",
  })
  @UseGuards(JwtAuthGuard)
  async deleteDataById(@Param("id") id: string) {
    try {
      const response = await firstValueFrom(this.client.send("delete_student",{id}))
      return response
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Put("/:id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update By Id" })
  @ApiResponse({
    status: 400,
    description: "User tidak ditemukan",
  })
  @UseInterceptors(FileInterceptor("avatar"))
  @UseGuards(JwtAuthGuard)
  async updateDataById(
    @Param("id") id: string,
    @UploadedFile() avatar: TFIle,
    @Body(new ZodValidationPipe(VSUpdateStudent))
    studentData: UpdateStudentSwagger,
  ) {
    try {
      const response = await firstValueFrom(this.client.send("update_student",{ id, avatar, ...studentData }))
      return response
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Get("/:id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get Data By Id" })
  @ApiResponse({
    status: 400,
    description: "Data tidak ditemukan",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  @UseGuards(JwtAuthGuard)
  async getDataById(@Param("id") id: string) {
    try {
      const response = await firstValueFrom(this.client.send("update_student",{ id }))
      return response
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }
}
