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
  LoginSchema,
  LogoutSchema,
  RtGuard,
  TReqToken,
  forgotPasswordSchema,
  newPasswordSchema,
  verifyOtpSchema,
  resendOtpSchema,
  ZodValidationPipe,
  RegisterZodSchema,
  RegisterSchema,
  LoginZodSchema,
  verifyOtpZodSchema,
  resendOtpZodSchema,
  forgotPasswordZodSchema,
  newPasswordZodSchema,
  LogoutZodSchema,
} from '@uninus/entities';
import { AuthService } from '@uninus/services';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiOperation({ summary: 'Created Data' })
  @ApiResponse({
    status: 201,
    description: 'Akun Berhasil dibuat!, check email untuk verifikasi',
  })
  @ApiResponse({ status: 400, description: 'Gagal mendaftar' })
  @ApiResponse({ status: 409, description: 'Email sudah terdaftar' })
  async register(
    @Body(new ZodValidationPipe(RegisterZodSchema))
    registerSchema: RegisterSchema
  ) {
    return await this.appService.register(registerSchema);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 201,
    description: 'Berhasil Login',
  })
  @ApiResponse({ status: 401, description: 'Password salah' })
  @ApiResponse({ status: 404, description: 'Akun Tidak ditemukan' })
  async login(
    @Body(new ZodValidationPipe(LoginZodSchema)) loginSchema: LoginSchema
  ) {
    return await this.appService.login(loginSchema.email, loginSchema.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: 201, description: 'Berhasil logout' })
  @ApiResponse({ status: 401, description: 'Gagal logout' })
  async logout(
    @Body(new ZodValidationPipe(LogoutZodSchema)) logoutSchema: LogoutSchema
  ) {
    return await this.appService.logout(logoutSchema?.refresh_token);
  }

  @Post('refresh')
  @ApiBearerAuth()
  @UseGuards(RtGuard)
  @ApiOperation({ summary: 'Refresh Token' })
  async refresh(@Request() reqToken: TReqToken) {
    return this.appService.refreshToken(reqToken);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify OTP' })
  @ApiResponse({ status: 201, description: 'Berhasil verifikasi OTP' })
  @ApiResponse({ status: 400, description: 'Gagal verifikasi OTP' })
  @ApiResponse({ status: 404, description: 'Email atau OTP tidak valid' })
  async verifyOtp(
    @Body(new ZodValidationPipe(verifyOtpZodSchema)) verifyOtp: verifyOtpSchema
  ) {
    return this.appService.verifyOtp(verifyOtp.email, verifyOtp.otp);
  }

  @Post('resend-otp')
  @ApiOperation({ summary: 'Resend OTP' })
  @ApiResponse({ status: 201, description: 'Berhasil kitim OTP' })
  @ApiResponse({ status: 400, description: 'Gagal kirim OTP' })
  @ApiResponse({ status: 404, description: 'Akun tidak ditemukan' })
  async resendOtp(
    @Body(new ZodValidationPipe(resendOtpZodSchema))
    resendOtpSchema: resendOtpSchema
  ) {
    return this.appService.resendOtp(resendOtpSchema.email);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Forgot Password' })
  @ApiResponse({ status: 201, description: 'Berhasil kirim OTP' })
  @ApiResponse({
    status: 400,
    description: 'Gagal mengirimkan kode verifikasi',
  })
  async forgotPassword(
    @Body(new ZodValidationPipe(forgotPasswordZodSchema))
    forgotPassword: forgotPasswordSchema
  ) {
    return this.appService.forgotPassword(forgotPassword.email);
  }

  @Post('verify-otp-password')
  @ApiOperation({ summary: 'Verify OTP Reset Password' })
  @ApiResponse({ status: 200, description: 'Berhasil verifikasi OTP' })
  @ApiResponse({ status: 400, description: 'Gagal verifikasi OTP' })
  @ApiResponse({ status: 404, description: 'Email atau OTP tidak valid' })
  async verifyOtpPassword(
    @Body(new ZodValidationPipe(verifyOtpZodSchema)) verifyOtp: verifyOtpSchema
  ) {
    return this.appService.verifyOtpPassword(verifyOtp.email, verifyOtp.otp);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset Password' })
  @ApiResponse({ status: 201, description: 'Berhasil mengganti password' })
  @ApiResponse({ status: 400, description: 'Gagal mengganti password' })
  async resetPassword(
    @Body(new ZodValidationPipe(newPasswordZodSchema))
    newPasswordSchema: newPasswordSchema
  ) {
    return this.appService.resetPassword(newPasswordSchema);
  }
}
