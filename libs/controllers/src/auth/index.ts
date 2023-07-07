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
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'Akun Berhasil dibuat!, check email untuk verifikasi',
  })
  @ApiResponse({ status: 400, description: 'Gagal mendaftar' })
  @ApiResponse({ status: 409, description: 'Email sudah terdaftar' })
  async register(@Body() registerDto: RegisterDto) {
    return await this.appService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'Berhasil Login',
  })
  @ApiResponse({ status: 401, description: 'Password salah' })
  @ApiResponse({ status: 404, description: 'Akun Tidak ditemukan' })
  async login(@Body() dto: LoginDto) {
    return await this.appService.login(dto.email, dto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @ApiResponse({ status: 201, description: 'Berhasil logout' })
  @ApiResponse({ status: 401, description: 'Gagal logout' })
  async logout(@Body() refreshDto: LogoutDto) {
    return await this.appService.logout(refreshDto.refresh_token);
  }

  @UseGuards(RtGuard)
  @Post('refresh')
  async refresh(@Request() reqToken: TReqToken) {
    return this.appService.refreshToken(reqToken);
  }

  @Post('verify')
  @ApiResponse({ status: 201, description: 'Berhasil verifikasi OTP' })
  @ApiResponse({ status: 400, description: 'Gagal verifikasi OTP' })
  @ApiResponse({ status: 404, description: 'Email atau OTP tidak valid' })
  async verifyOtp(@Body() verifyOtp: verifyOtpDto) {
    return this.appService.verifyOtp(verifyOtp.email, verifyOtp.otp);
  }

  @Post('forgot-password')
  @ApiResponse({ status: 201, description: 'Berhasil kirim OTP' })
  @ApiResponse({
    status: 400,
    description: 'Gagal mengirimkan kode verifikasi',
  })
  async forgotPassword(@Body() forgotPassword: forgotPasswordDto) {
    return this.appService.forgotPassword(forgotPassword.email);
  }

  @Post('reset-password')
  @ApiResponse({ status: 201, description: 'Berhasil mengganti password' })
  @ApiResponse({ status: 400, description: 'Gagal mengganti password' })
  async resetPassword(@Body() newPasswordDto: newPasswordDto) {
    return this.appService.resetPassword(newPasswordDto);
  }
}
