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
  async login(@Body() dto: LoginDto) {
    return await this.appService.login(dto.email, dto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Body('refresh_token') refresh_token: string) {
    return await this.appService.logout(refresh_token);
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
  async forgotPassword(@Body() forgotPassword: forgotPasswordDto) {
    return this.appService.forgotPassword(forgotPassword.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() newPasswordDto: newPasswordDto) {
    return this.appService.resetPassword(newPasswordDto);
  }
}
