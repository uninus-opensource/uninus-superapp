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
  CreateUserDto,
  JwtAuthGuard,
  TReqToken,
  UpdateUserDto,
} from '@uninus/entities';
import { UserService } from '@uninus/services';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get('/me')
  @ApiResponse({ status: 400, description: 'User tidak ditemukan' })
  @UseGuards(JwtAuthGuard)
  getUser(@Request() reqToken: TReqToken) {
    const { sub } = reqToken.user;
    return this.appService.getUser(sub);
  }

  @Get()
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
  @ApiResponse({ status: 400, description: 'User tidak ditemukan' })
  getDataById(@Param('id') id: string) {
    return this.appService.getUser(id);
  }

  @Post()
  @ApiResponse({
    status: 400,
    description: 'Email sudah digunakan, NIK sudah digunakan',
  })
  createData(@Body() createUserDto: CreateUserDto) {
    return this.appService.createUser(createUserDto);
  }

  @Delete('/:id')
  @ApiResponse({ status: 201, description: 'Berhasil delete user' })
  @ApiResponse({ status: 400, description: 'User tidak ditemukan' })
  deleteData(@Param('id') id: string) {
    return this.appService.deleteUser(id);
  }

  @Put('/:id')
  @ApiResponse({ status: 201, description: 'Berhasil update user' })
  @ApiResponse({ status: 400, description: 'User tidak ditemukan' })
  updateData(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.appService.updateUser(id, updateUserDto);
  }
}
