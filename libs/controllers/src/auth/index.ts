import { Controller, Get, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from '@uninus/services';

@Controller()
export class AuthController {
  constructor(private readonly appService: AuthService) {}
  @Get('/')
  getData(
    @Query('page') page: number,
    @Query('orderBy') orderBy: Prisma.UsersOrderByWithRelationInput,
    @Query('where') where: Prisma.UsersWhereInput
  ) {
    return this.appService.getUser({
      where,
      orderBy,
      page,
    });
  }
}
