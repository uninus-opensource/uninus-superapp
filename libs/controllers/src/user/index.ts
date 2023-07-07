import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@uninus/entities';
import { UserService } from '@uninus/services';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly appService: UserService) {}
  @Get()
  getData(
    @Query('page') page: number,
    @Query('per_page') perPage: number,
    @Query('order_by') orderBy: 'asc' | 'desc',
    @Query('filter_by') filterBy: string,
    @Query('search') search: string
  ) {
    return this.appService.getUser({
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
    return this.appService.getUserById(id);
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
