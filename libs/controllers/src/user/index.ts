import { Body, Controller, Get, Query } from '@nestjs/common';
import { UserService } from '@uninus/services';

@Controller()
export class UserController {
  constructor(private readonly appService: UserService) {}
  @Get('/user')
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
}
