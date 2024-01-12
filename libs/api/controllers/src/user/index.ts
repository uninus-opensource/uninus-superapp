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
  EOrderByPagination,
  TCreateUserRequest,
  TUpdateUserRequest,
  VSUpdateUser,
  VSCreateUser,
  TCreateNotificationRequest,
} from "@uninus/entities";
import { JwtAuthGuard } from "@uninus/api/guard";
import { CreateNotificationDto, CreateUserDto, UpdateUserDto } from "@uninus/api/dto";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
  ApiHeader,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";

import { UserService } from "@uninus/api/services";
import { ZodValidationPipe } from "@uninus/api/pipes";

@ApiTags("User")
@ApiBearerAuth("bearer")
@Controller("user")
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly appService: UserService) {}

  @ApiOperation({ summary: "Create Notification" })
  @ApiBody({ type: CreateNotificationDto })
  @Post("notification")
  async createNotification(@Body() payload: TCreateNotificationRequest) {
    return await this.appService.createNotification(payload);
  }

  @ApiOperation({ summary: "Delete Notification" })
  @ApiParam({ name: "id", type: "string", required: true })
  @Delete("notification/:id")
  async deleteNotification(@Param("id") id: string) {
    return await this.appService.deleteNotification({ id });
  }

  @ApiOperation({ summary: "Get Notification" })
  @Get("notification")
  async getNotification(@Request() reqToken: TReqToken) {
    const { sub: id } = reqToken.user;
    return await this.appService.getNotification({ id });
  }

  @ApiOperation({ summary: "Get Data User" })
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
    required: true,
  })
  @Get("/me")
  async getDatauser(@Request() reqToken: TReqToken) {
    const { sub: id } = reqToken.user;
    return await this.appService.getDataUser({ id });
  }

  @ApiOperation({ summary: "Pagination List User" })
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
    required: true,
  })
  @ApiQuery({ name: "page", required: false })
  @ApiQuery({ name: "perPage", required: false })
  @ApiQuery({ name: "orderBy", enum: EOrderByPagination, required: false })
  @ApiQuery({ name: "filterBy", required: false })
  @ApiQuery({ name: "search", required: false })
  @Get()
  async getDataUsers(
    @Query("page") page: number,
    @Query("perPage") perPage: number,
    @Query("orderBy") orderBy: EOrderByPagination.ASC | EOrderByPagination.DESC,
    @Query("filterBy") filterBy: string,
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
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
    required: true,
  })
  @Get("/:id")
  async getDataUserById(@Param("id") id: string) {
    return await this.appService.getDataUserById({ id });
  }

  @ApiOperation({ summary: "Delete By Id" })
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
    required: true,
  })
  @Delete("/:id")
  async deleteDataUser(@Param("id") id: string) {
    return await this.appService.deleteDataUser({ id });
  }
  @ApiOperation({ summary: "Update user" })
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
    required: true,
  })
  @ApiBody({ type: UpdateUserDto })
  @Patch()
  async updateUser(
    @Request() reqToken: TReqToken,
    @Body(new ZodValidationPipe(VSUpdateUser))
    payload: TUpdateUserRequest,
  ) {
    const { sub: id } = reqToken.user;
    return await this.appService.updateUser({ id, ...payload });
  }

  @ApiOperation({ summary: "Update User By Id" })
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
    required: true,
  })
  @ApiBody({ type: UpdateUserDto })
  @Patch("/:id")
  async updateUserById(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(VSUpdateUser))
    payload: TUpdateUserRequest,
  ) {
    return await this.appService.updateUserById({ id, ...payload });
  }

  @ApiOperation({ summary: "Create user" })
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
    required: true,
  })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async createUser(
    @Body(new ZodValidationPipe(VSCreateUser))
    payload: TCreateUserRequest,
  ) {
    return await this.appService.createUser(payload);
  }

  @ApiOperation({ summary: "Get Roles" })
  @Get("roles")
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  async getRoles(@Query("id") id: string, @Query("search") search: string) {
    return await this.appService.getRoles({ id, search });
  }
}
