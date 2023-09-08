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
  UsePipes,
} from "@nestjs/common";
import { VSCreateUser, TReqToken, VSUpdateUser, TProfileResponse } from "@uninus/entities";
import { ZodValidationPipe } from "@uninus/api/validator";
import { JwtAuthGuard } from "@uninus/api/guard";
import { CreateUserSwagger, UpdateUserSwagger } from "@uninus/api/services";
import { ApiResponse, ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, firstValueFrom, throwError } from "rxjs";
import { generateOtp } from "@uninus/api/utilities";
import { RpcExceptionToHttpExceptionFilter } from "@uninus/api/filter";

@Controller("user")
@ApiTags("User")
export class UserController {
  constructor(@Inject("USER_SERVICE") private readonly client: ClientProxy) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: "Get Data" })
  @ApiResponse({ status: 400, description: "User tidak ditemukan" })
  @Get("/me")
  @UseGuards(JwtAuthGuard)
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async getUser(@Request() reqToken: TReqToken) {
    const { sub } = reqToken.user;
    const response = await firstValueFrom(
      this.client
        .send<TProfileResponse>("get_user", sub)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @ApiOperation({ summary: "Pagination List User" })
  @ApiQuery({ name: "page", required: false })
  @ApiQuery({ name: "per_page", required: false })
  @ApiQuery({ name: "order_by", required: false })
  @ApiQuery({ name: "filter_by", required: false })
  @ApiQuery({ name: "search", required: false })
  @Get()
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async getAllData(
    @Query("page") page: number,
    @Query("per_page") perPage: number,
    @Query("order_by") orderBy: "asc" | "desc",
    @Query("filter_by") filterBy: string,
    @Query("search") search: string,
  ) {
    const response = await firstValueFrom(
      this.client
        .send<Array<TProfileResponse>>("get_users", {
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
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @ApiOperation({ summary: "Get Data User By Id" })
  @ApiResponse({ status: 400, description: "User tidak ditemukan" })
  @Get("/:id")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async getDataById(@Param("id") id: string) {
    const response = await firstValueFrom(
      this.client
        .send<TProfileResponse>("get_user", id)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @ApiOperation({ summary: "Create Data user" })
  @ApiResponse({
    status: 400,
    description: "Email sudah digunakan, NIK sudah digunakan",
  })
  @Post()
  @UsePipes(new ZodValidationPipe(VSCreateUser))
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async createData(
    @Body()
    payload: CreateUserSwagger,
  ) {
    const response = await firstValueFrom(
      this.client
        .send<TProfileResponse>("create_user", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    const isCreateOtp = await generateOtp(response?.email, response?.id);
    if (!isCreateOtp) {
      throw new BadRequestException("Gagal membuat Otp");
    }
    const emailPayload = {
      email: payload.email,
      subject: "Verifikasi Email",
      html: `Kode OTP anda adalah ${isCreateOtp?.token}`,
    };
    const sendEmail = firstValueFrom(
      this.client
        .send<{ message: string }>("send_email", emailPayload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    if (!sendEmail) {
      throw new BadRequestException("Gagal mengirimkan kode verifikasi");
    }
    return response;
  }

  @ApiOperation({ summary: "Delete By Id" })
  @ApiResponse({ status: 201, description: "Berhasil delete user" })
  @ApiResponse({ status: 400, description: "User tidak ditemukan" })
  @Delete("/:id")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async deleteData(@Param("id") id: string) {
    const response = await firstValueFrom(
      this.client
        .send("delete_user", id)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @ApiOperation({ summary: "Edit User By Id" })
  @ApiResponse({ status: 201, description: "Berhasil update user" })
  @ApiResponse({ status: 400, description: "User tidak ditemukan" })
  @Put("/:id")
  @UsePipes(new ZodValidationPipe(VSUpdateUser))
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async updateData(
    @Param("id") id: string,
    @Body()
    payload: UpdateUserSwagger,
  ) {
    const response = await firstValueFrom(
      this.client
        .send("update_user", {
          id,
          payload,
        })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
}
