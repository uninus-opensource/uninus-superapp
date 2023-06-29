import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards, Req, Res } from '@nestjs/common';
import { RegisterDto, LoginDto } from '@uninus/entities';
import { AuthService } from '@uninus/services';
import { JwtAuthGuard  } from '@uninus/entities';

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
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.appService.register(registerDto);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUsers() {
    return this.appService.profile
  }


  @HttpCode(HttpStatus.OK)
  @Post ('login')
  async login(@Body() dto: LoginDto, @Req() req: any , @Res() res: any) {
    const login = await this.appService.login(dto, req, res)
    return login
  }
}
