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

@Controller('user')
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
  getDataById(@Param('id') id: string) {
    return this.appService.getUserById(id);
  }

  @Post()
  createData(@Body() createUserDto: CreateUserDto) {
    return this.appService.createUser(createUserDto);
  }

  @Delete('/:id')
  deleteData(@Param('id') id: string) {
    return this.appService.deleteUser(id);
  }

  @Put('/:id')
  updateData(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.appService.updateUser(id, updateUserDto);
  }
}
