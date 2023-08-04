import {
  Body,
  Inject,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  BadRequestException,
} from "@nestjs/common";
import { VSCreateUser, TReqToken, VSUpdateUser } from "@uninus/entities";
import { ZodValidationPipe } from "@uninus/api/validator";
import { JwtAuthGuard } from "@uninus/api/guard";
import { CreateUserSwagger, UpdateUserSwagger } from "@uninus/api/services";
import { ApiResponse, ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Controller("user")
@ApiTags("User")
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientProxy
  ) {}

  @Get("/me")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get Data" })
  @ApiResponse({ status: 400, description: "User tidak ditemukan" })
  @UseGuards(JwtAuthGuard)
  async getUser(@Request() reqToken: TReqToken) {
    try {
      const { sub } = reqToken.user;
      const response = await firstValueFrom(this.client.send<{}>("get_user",sub))
      return response
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Get()
  @ApiOperation({ summary: "Pagination List User" })
  async getAllData(
    @Query("page") page: number,
    @Query("per_page") perPage: number,
    @Query("order_by") orderBy: "asc" | "desc",
    @Query("filter_by") filterBy: string,
    @Query("search") search: string,
  ) {
    try {
      const response = await firstValueFrom(
        this.client.send<{}>("get_users",{
          where: {
            OR: [
              {
                fullname: {
                  contains: search || "",
                  mode: "insensitive",
                },
              },
              {
                email: {
                  contains: search || "",
                  mode: "insensitive",
                },
              },
            ],
          },
          orderBy: {
            [filterBy]: orderBy,
          },
          page,
          perPage,
        })
      )
      return response
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Get("/:id")
  @ApiOperation({ summary: "Get Data User By Id" })
  @ApiResponse({ status: 400, description: "User tidak ditemukan" })
  async getDataById(@Param("id") id: string) {
    try {
      const response = await firstValueFrom(this.client.send<{}>("get_user",id))
      return response
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Post()
  @ApiOperation({ summary: "Create Data user" })
  @ApiResponse({
    status: 400,
    description: "Email sudah digunakan, NIK sudah digunakan",
  })
  async createData(
    @Body(new ZodValidationPipe(VSCreateUser))
    createUserSwagger: CreateUserSwagger,
  ) {
    try {
      const response = await firstValueFrom(this.client.send<{}>("create_user",createUserSwagger))
      return response
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Delete By Id" })
  @ApiResponse({ status: 201, description: "Berhasil delete user" })
  @ApiResponse({ status: 400, description: "User tidak ditemukan" })
  async deleteData(@Param("id") id: string) {
    try {
      const response = await firstValueFrom(this.client.send("delete_user", id))
      return response
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Put("/:id")
  @ApiOperation({ summary: "Edit User By Id" })
  @ApiResponse({ status: 201, description: "Berhasil update user" })
  @ApiResponse({ status: 400, description: "User tidak ditemukan" })
  async updateData(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(VSUpdateUser))
    updateUserSwagger: UpdateUserSwagger,
  ) {
    try {
      const response = await firstValueFrom(this.client.send('update_user',{
        id,
        payload:updateUserSwagger
      }))
      return response
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

}
