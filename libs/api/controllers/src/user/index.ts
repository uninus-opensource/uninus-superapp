import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
  Patch,
  Post,
  Headers,
} from "@nestjs/common";
import {
  TReqToken,
  EAppsOrigin,
  EOrderByPagination,
  TCreateUserRequest,
  TUpdateUserRequest,
  VSUpdateUser,
  VSCreateUser,
} from "@uninus/entities";
import { JwtAuthGuard, PermissionGuard } from "@uninus/api/guard";
import { CreateUserDto, UpdateUserDto } from "@uninus/api/dto";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
  ApiHeader,
  ApiBody,
} from "@nestjs/swagger";

import { UserService } from "@uninus/api/services";
import { ZodValidationPipe } from "@uninus/api/pipes";

@ApiTags("User")
@ApiBearerAuth("bearer")
@ApiHeader({
  name: "app-origin",
  description: "Application Origin",
  required: true,
})
@Controller("user")
export class UserController {
  constructor(private readonly appService: UserService) {}

  @ApiOperation({ summary: "Get Data User" })
  @Get("/me")
  @UseGuards(JwtAuthGuard)
  async getDatauser(@Request() reqToken: TReqToken) {
    const { sub: id } = reqToken.user;
    return await this.appService.getDataUser({ id });
  }

  @ApiOperation({ summary: "Pagination List User" })
  @ApiQuery({ name: "page", required: false })
  @ApiQuery({ name: "per_page", required: false })
  @ApiQuery({ name: "order_by", required: false })
  @ApiQuery({ name: "filter_by", required: false })
  @ApiQuery({ name: "search", required: false })
  @Get()
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBADMIN]))
  async getDataUsers(
    @Query("page") page: number,
    @Query("per_page") perPage: number,
    @Query("order_by") orderBy: EOrderByPagination.ASC | EOrderByPagination.DESC,
    @Query("filter_by") filterBy: string,
    @Query("search") search: string,
    @Headers("app-origin") app_origin: string,
  ) {
    return await this.appService.getDataUsers({
      page,
      perPage,
      orderBy,
      filterBy,
      search,
      app_origin,
    });
  }

  @ApiOperation({ summary: "Get Data User By Id" })
  @Get("/:id")
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBADMIN]))
  async getDataUserById(@Param("id") id: string) {
    return await this.appService.getDataUserById({ id });
  }

  @ApiOperation({ summary: "Delete By Id" })
  @Delete("/:id")
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBADMIN]))
  async deleteDataUser(@Param("id") id: string) {
    return await this.appService.deleteDataUser({ id });
  }
  @ApiOperation({ summary: "Update user" })
  @ApiBody({ type: UpdateUserDto })
  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Request() reqToken: TReqToken,
    @Body(new ZodValidationPipe(VSUpdateUser))
    payload: TUpdateUserRequest,
  ) {
    const { sub: id } = reqToken.user;
    return await this.appService.updateUser({ id, ...payload });
  }

  @ApiOperation({ summary: "Update User By Id" })
  @ApiBody({ type: UpdateUserDto })
  @Patch("/:id")
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBADMIN]))
  async updateUserById(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(VSUpdateUser))
    payload: TUpdateUserRequest,
  ) {
    return await this.appService.updateUserById({ id, ...payload });
  }

  @ApiOperation({ summary: "Create user" })
  @ApiBody({ type: CreateUserDto })
  @Post()
  @UseGuards(JwtAuthGuard, PermissionGuard([EAppsOrigin.PMBADMIN]))
  async createUser(
    @Body(new ZodValidationPipe(VSCreateUser))
    payload: TCreateUserRequest,
  ) {
    return await this.appService.createUser(payload);
  }
}
