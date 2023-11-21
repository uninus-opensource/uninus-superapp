import {
  Body,
  Inject,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
  UseFilters,
  Patch,
  Post,
  Headers,
} from "@nestjs/common";
import {
  TReqToken,
  TProfileResponse,
  EAppsOrigin,
  EOrderByPagination,
  IUserRequest,
  TCreateUserRequest,
} from "@uninus/entities";
import { JwtAuthGuard, PermissionGuard } from "@uninus/api/guard";
import { CreateUserDto, UpdateUserDto } from "@uninus/api/dto";
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

import { RpcExceptionToHttpExceptionFilter } from "@uninus/api/pipes";

@Controller("user")
@ApiTags("User")
export class UserController {
  constructor(@Inject("USER_SERVICE") private readonly client: ClientProxy) {}

  @ApiBearerAuth("bearer")
  @ApiOperation({ summary: "Get Data" })
  @ApiResponse({ status: 400, description: "User tidak ditemukan" })
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
  })
  @Get("/me")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
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
  @ApiBearerAuth("bearer")
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
    required: true,
  })
  @Get()
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBADMIN]))
  async getAllData(
    @Query("page") page: number,
    @Query("per_page") perPage: number,
    @Query("order_by") orderBy: EOrderByPagination.ASC | EOrderByPagination.DESC,
    @Query("filter_by") filterBy: string,
    @Query("search") search: string,
    @Headers("app-origin") app_origin: string,
  ) {
    const response = await firstValueFrom(
      this.client
        .send<Array<TProfileResponse>>("get_users", {
          app_origin,
          search,
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
  @ApiBearerAuth("bearer")
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
  })
  @Get("/:id")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBADMIN]))
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
  @ApiBearerAuth("bearer")
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
  })
  @Delete("/:id")
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBADMIN]))
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
  @ApiBearerAuth("bearer")
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
  })
  @Patch("/:id")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBADMIN]))
  async updateData(
    @Param("id") id: string,
    @Body()
    payload: UpdateUserDto,
  ) {
    const response = await firstValueFrom(
      this.client
        .send<IUserRequest>("update_user", { id, ...payload })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 201, description: "Berhasil membuat user" })
  @ApiBearerAuth("bearer")
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
  })
  @Post()
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBADMIN]))
  async createUser(
    @Body()
    payload: CreateUserDto,
  ) {
    const response = await firstValueFrom(
      this.client
        .send<TCreateUserRequest>("create_user", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
}
