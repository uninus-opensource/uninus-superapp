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
  UseFilters,
} from "@nestjs/common";
import { VSCreateUser, TReqToken, VSUpdateUser, TProfileResponse } from "@uninus/entities";
import { ZodValidationPipe } from "@uninus/api/validator";
import { JwtAuthGuard } from "@uninus/api/guard";
import { CreateUserSwagger, UpdateUserSwagger } from "@uninus/api/services";
import { ApiResponse, ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { generateOtp } from "@uninus/api/utilities"
import { RpcExceptionToHttpExceptionFilter } from "@uninus/api/filter";

@Controller("user")
@ApiTags("User")
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientProxy
  ) {}

  @Get("/me")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get Data" })
  @ApiResponse({ status: 400, description: "User tidak ditemukan" })
  @UseGuards(JwtAuthGuard)
  async getUser(@Request() reqToken: TReqToken) {
      const { sub } = reqToken.user;
      const response = await firstValueFrom(this.client.send<TProfileResponse>("get_user",sub))
      return response
  }

  @Get()
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Pagination List User" })
  async getAllData(
    @Query("page") page: number,
    @Query("per_page") perPage: number,
    @Query("order_by") orderBy: "asc" | "desc",
    @Query("filter_by") filterBy: string,
    @Query("search") search: string,
  ) {
      const response = await firstValueFrom(
        this.client.send<Array<TProfileResponse>>("get_users",{
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
  }

  @Get("/:id")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Data User By Id" })
  @ApiResponse({ status: 400, description: "User tidak ditemukan" })
  async getDataById(@Param("id") id: string) {
      const response = await firstValueFrom(this.client.send<TProfileResponse>("get_user",id))
      return response
  }

  @Post()
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Create Data user" })
  @ApiResponse({
    status: 400,
    description: "Email sudah digunakan, NIK sudah digunakan",
  })
  async createData(
    @Body(new ZodValidationPipe(VSCreateUser))
    createUserSwagger: CreateUserSwagger,
  ) {
      const response = await firstValueFrom(this.client.send<TProfileResponse>("create_user",createUserSwagger))
      const isCreateOtp = await generateOtp(response?.email, response?.id);
      if (!isCreateOtp) {
        throw new BadRequestException("Gagal membuat Otp");
      }
      const emailPayload = {
        email: createUserSwagger.email.toLowerCase(),
        subject:"Verifikasi Email",
        html:`Kode OTP anda adalah ${isCreateOtp?.token}`,
      }
      const sendEmail = firstValueFrom(this.client.send<{message:string}>("send_email",emailPayload))
      if (!sendEmail) {
        throw new BadRequestException("Gagal mengirimkan kode verifikasi");
      }
      return response
  }

  @Delete("/:id")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Delete By Id" })
  @ApiResponse({ status: 201, description: "Berhasil delete user" })
  @ApiResponse({ status: 400, description: "User tidak ditemukan" })
  async deleteData(@Param("id") id: string) {
      const response = await firstValueFrom(this.client.send("delete_user", id))
      return response
  }

  @Put("/:id")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Edit User By Id" })
  @ApiResponse({ status: 201, description: "Berhasil update user" })
  @ApiResponse({ status: 400, description: "User tidak ditemukan" })
  async updateData(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(VSUpdateUser))
    updateUserSwagger: UpdateUserSwagger,
  ) {
      const response = await firstValueFrom(this.client.send('update_user',{
        id,
        payload:updateUserSwagger
      }))
      return response
  }

}
