import {
  Body,
  Inject,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  Request,
  UseGuards,
  UseFilters,
  UsePipes,
} from "@nestjs/common";
import {
  TReqToken,
  VSUpdateUser,
  TProfileResponse,
  EAppsOrigin,
  EOrderByPagination,
} from "@uninus/entities";
import { ZodValidationPipe } from "@uninus/api/validator";
import { JwtAuthGuard, PermissionGuard } from "@uninus/api/guard";
import { UpdateUserSwagger } from "@uninus/api/services";
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
  ApiHeader,
} from "@nestjs/swagger";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, firstValueFrom, throwError } from "rxjs";

import { RpcExceptionToHttpExceptionFilter } from "@uninus/api/filter";

@Controller("user")
@ApiTags("User")
export class UserController {
  constructor(@Inject("USER_SERVICE") private readonly client: ClientProxy) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: "Get Data" })
  @ApiResponse({ status: 400, description: "User tidak ditemukan" })
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
  })
  @Get("/me")
  @UseGuards(JwtAuthGuard, PermissionGuard([...Object.values(EAppsOrigin)]))
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
    @Query("order_by") orderBy: EOrderByPagination.ASC | EOrderByPagination.DESC,
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
