import { Body, Controller, Post, Request, UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import {
  TReqToken,
  VSRegister,
  VSLogin,
  VSVerifyOtp,
  VSResendOtp,
  VSForgotPassword,
  VSNewPassword,
  VSLogout,
} from "@uninus/entities";
import { RtGuard } from "@uninus/api/guard";
import { ZodValidationPipe } from "@uninus/api/validator";
import {
  AuthService,
  RegisterSwagger,
  LoginSwagger,
  ForgotPasswordSwagger,
  LogoutSwagger,
  ResendOtpSwagger,
  NewPasswordSwagger,
  VerifyOtpSwagger,
  RefreshTokenSwagger,
} from "@uninus/api/services";
import { RpcExceptionToHttpExceptionFilter } from "@uninus/api/filter";
import { ApiTags, ApiBody, ApiResponse, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @ApiOperation({ summary: "Register" })
  @ApiResponse({
    status: 201,
    description: "Akun Berhasil dibuat!, check email untuk verifikasi",
  })
  @ApiResponse({ status: 400, description: "Gagal mendaftar" })
  @ApiResponse({ status: 409, description: "Email sudah terdaftar" })
  @Post("register")
  @UsePipes(new ZodValidationPipe(VSRegister))
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async register(
    @Body()
    payload: RegisterSwagger,
  ) {
    return await this.appService.register(payload);
  }

  @ApiOperation({ summary: "Login" })
  @ApiResponse({
    status: 201,
    description: "Berhasil Login",
  })
  @ApiResponse({ status: 401, description: "Email atau Password tidak valid" })
  @Post("login")
  @UsePipes(new ZodValidationPipe(VSLogin))
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async login(@Body() payload: LoginSwagger) {
    return await this.appService.login(payload);
  }

  @ApiOperation({ summary: "Logout" })
  @ApiResponse({ status: 201, description: "Berhasil logout" })
  @ApiResponse({ status: 401, description: "Gagal logout" })
  @Post("logout")
  @UsePipes(new ZodValidationPipe(VSLogout))
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async logout(@Body() payload: LogoutSwagger) {
    return await this.appService.logout(payload);
  }

  @ApiOperation({ summary: "Refresh Token" })
  @ApiBearerAuth()
  @ApiBody({ type: RefreshTokenSwagger })
  @Post("refresh")
  @UseGuards(RtGuard)
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async refresh(@Request() { user }: TReqToken) {
    return this.appService.refreshToken({ user });
  }

  @ApiOperation({ summary: "Verify OTP" })
  @ApiResponse({ status: 201, description: "Berhasil verifikasi OTP" })
  @ApiResponse({ status: 400, description: "Gagal verifikasi OTP" })
  @ApiResponse({ status: 404, description: "Email atau OTP tidak valid" })
  @Post("verify")
  @UsePipes(new ZodValidationPipe(VSVerifyOtp))
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async verifyOtp(@Body() payload: VerifyOtpSwagger) {
    return this.appService.verifyOtp(payload);
  }

  @ApiOperation({ summary: "Resend OTP" })
  @ApiResponse({ status: 201, description: "Berhasil kitim OTP" })
  @ApiResponse({ status: 400, description: "Gagal kirim OTP" })
  @ApiResponse({ status: 404, description: "Akun tidak ditemukan" })
  @Post("resend-otp")
  @UsePipes(new ZodValidationPipe(VSResendOtp))
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async resendOtp(
    @Body()
    payload: ResendOtpSwagger,
  ) {
    return this.appService.resendOtp(payload);
  }

  @ApiOperation({ summary: "Forgot Password" })
  @ApiResponse({ status: 201, description: "Berhasil kirim OTP" })
  @ApiResponse({
    status: 400,
    description: "Gagal mengirimkan kode verifikasi",
  })
  @Post("forgot-password")
  @UsePipes(new ZodValidationPipe(VSForgotPassword))
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async forgotPassword(
    @Body()
    payload: ForgotPasswordSwagger,
  ) {
    return this.appService.forgotPassword(payload);
  }

  @ApiOperation({ summary: "Verify OTP Reset Password" })
  @ApiResponse({ status: 200, description: "Berhasil verifikasi OTP" })
  @ApiResponse({ status: 400, description: "Gagal verifikasi OTP" })
  @ApiResponse({ status: 404, description: "Email atau OTP tidak valid" })
  @Post("verify-otp-password")
  @UsePipes(new ZodValidationPipe(VSVerifyOtp))
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async verifyOtpPassword(@Body() payload: VerifyOtpSwagger) {
    return this.appService.verifyOtpPassword(payload);
  }

  @ApiOperation({ summary: "Reset Password" })
  @ApiResponse({ status: 201, description: "Berhasil mengganti password" })
  @ApiResponse({ status: 400, description: "Gagal mengganti password" })
  @Post("reset-password")
  @UsePipes(new ZodValidationPipe(VSNewPassword))
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async resetPassword(
    @Body()
    payload: NewPasswordSwagger,
  ) {
    return this.appService.resetPassword(payload);
  }
}
