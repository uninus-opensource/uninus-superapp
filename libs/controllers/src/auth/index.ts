import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard, LoginDto, RegisterDto } from '@uninus/entities';
import { AuthService } from '@uninus/services';


type TRequestAuth = {
  user: {
    nik: string;
    email: string;
  }
}

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
  async getUsers(@Request() req: TRequestAuth) {
    const { nik, email } = req.user;
    return await this.appService.profile(nik, email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const login = await this.appService.login(dto);
    return login;
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Body() body: { refresh_token: string }) {
    const { refresh_token } = body;
    await this.appService.logout(refresh_token);
    return { message: 'logout telah berhasil' };
  }
}
