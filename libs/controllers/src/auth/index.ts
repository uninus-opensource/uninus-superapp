import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  LoginDto,
  LogoutDto,
  RegisterDto,
  RtGuard,
  TReqToken,
  forgotPasswordDto,
  newPasswordDto,
  verifyOtpDto,
} from '@uninus/entities';
import { AuthService } from '@uninus/services';

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.appService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.appService.login(loginDto.email, loginDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(RtGuard)
  @Post('logout')
  async logout(@Request() LogoutDto: LogoutDto) {
    const { sub } = LogoutDto.user;
    return await this.appService.logout(sub);
  }

  @UseGuards(RtGuard)
  @Post('refresh')
  async refresh(@Request() reqToken: TReqToken) {
    return this.appService.refreshToken(reqToken);
  }

  @Post('verify')
  async verifyOtp(@Body() verifyOtp: verifyOtpDto) {
    return this.appService.verifyOtp(verifyOtp.email, verifyOtp.otp);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: forgotPasswordDto) {
    return this.appService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() newPasswordDto: newPasswordDto) {
    return this.appService.resetPassword(newPasswordDto);
  }
}
