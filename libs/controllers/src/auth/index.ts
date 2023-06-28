import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { RegisterDto } from '@uninus/entities';
import { AuthService } from '@uninus/services';

@Controller()
export class AuthController {
  constructor(private readonly appService: AuthService) {}
  @Get('/')
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
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: search,
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

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() registerDto: RegisterDto) {
    const result = this.appService.signup({
      fullname: registerDto.fullname,
      nik: registerDto.nik,
      email: registerDto.email,
      password: registerDto.password,
    })

    const user = await result;
    return {
      fullname: user.fullname,
      nik: user.nik,
      email: user.email,
      role: user.role_id,
    };
  }
}
