import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  CreateUserSwagger,
  CreateUserZodSchema,
  JwtAuthGuard,
  TReqToken,
  UpdateUserSwagger,
  UpdateUserZodSchema,
  ZodValidationPipe,
} from '@uninus/entities';
import { UserService } from '@uninus/services';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get('/me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Data' })
  @ApiResponse({ status: 400, description: 'User tidak ditemukan' })
  @UseGuards(JwtAuthGuard)
  getUser(@Request() reqToken: TReqToken) {
    const { sub } = reqToken.user;
    return this.appService.getUser(sub);
  }

  @Get()
  @ApiOperation({ summary: 'Pagination List User' })
  getAllData(
    @Query('page') page: number,
    @Query('per_page') perPage: number,
    @Query('order_by') orderBy: 'asc' | 'desc',
    @Query('filter_by') filterBy: string,
    @Query('search') search: string
  ) {
    return this.appService.getUsers({
      where: {
        OR: [
          {
            fullname: {
              contains: search || '',
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: search || '',
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: {
        [filterBy]: orderBy,
      },
      page,
      perPage,
    });
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get Data User By Id' })
  @ApiResponse({ status: 400, description: 'User tidak ditemukan' })
  getDataById(@Param('id') id: string) {
    return this.appService.getUser(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create Data user' })
  @ApiResponse({
    status: 400,
    description: 'Email sudah digunakan, NIK sudah digunakan',
  })
  createData(
    @Body(new ZodValidationPipe(CreateUserZodSchema))
    createUserSwagger: CreateUserSwagger
  ) {
    return this.appService.createUser(createUserSwagger);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete By Id' })
  @ApiResponse({ status: 201, description: 'Berhasil delete user' })
  @ApiResponse({ status: 400, description: 'User tidak ditemukan' })
  deleteData(@Param('id') id: string) {
    return this.appService.deleteUser(id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Edit User By Id' })
  @ApiResponse({ status: 201, description: 'Berhasil update user' })
  @ApiResponse({ status: 400, description: 'User tidak ditemukan' })
  updateData(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateUserZodSchema))
    updateUserSwagger: UpdateUserSwagger
  ) {
    return this.appService.updateUser(id, updateUserSwagger);
  }
}
