import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
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
  forgotPasswordSwagger,
  LogoutSwagger,
  resendOtpSwagger,
  newPasswordSwagger,
  verifyOtpSwagger,
  RefreshTokenSwagger,
} from "@uninus/api/services";
import { RpcExceptionToHttpExceptionFilter } from "@uninus/api/filter";
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @Post("register")
  @ApiOperation({ summary: "Created Data" })
  @ApiResponse({
    status: 201,
    description: "Akun Berhasil dibuat!, check email untuk verifikasi",
  })
  @ApiResponse({ status: 400, description: "Gagal mendaftar" })
  @ApiResponse({ status: 409, description: "Email sudah terdaftar" })
  async register(
    @Body(new ZodValidationPipe(VSRegister))
    registerSwagger: RegisterSwagger,
  ) {
    return await this.appService.register(registerSwagger);
  }

  @HttpCode(HttpStatus.OK)
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @Post("login")
  @ApiOperation({ summary: "Login" })
  @ApiResponse({
    status: 201,
    description: "Berhasil Login",
  })
  @ApiResponse({ status: 401, description: "Email atau Password tidak valid" })
  async login(@Body(new ZodValidationPipe(VSLogin)) LoginSwagger: LoginSwagger) {
    return await this.appService.login(LoginSwagger);
  }

  @HttpCode(HttpStatus.OK)
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @Post("logout")
  @ApiOperation({ summary: "Logout" })
  @ApiResponse({ status: 201, description: "Berhasil logout" })
  @ApiResponse({ status: 401, description: "Gagal logout" })
  async logout(@Body(new ZodValidationPipe(VSLogout)) LogoutSwagger: LogoutSwagger) {
    return await this.appService.logout(LogoutSwagger);
  }

  @Post("refresh")
  @ApiBearerAuth()
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @UseGuards(RtGuard)
  @ApiOperation({ summary: "Refresh Token" })
  async refresh(
    @Body("refresh_token") refreshToken: RefreshTokenSwagger,
    @Request() { user }: TReqToken,
  ) {
    return this.appService.refreshToken({ user });
  }

  @Post("verify")
  @ApiOperation({ summary: "Verify OTP" })
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiResponse({ status: 201, description: "Berhasil verifikasi OTP" })
  @ApiResponse({ status: 400, description: "Gagal verifikasi OTP" })
  @ApiResponse({ status: 404, description: "Email atau OTP tidak valid" })
  async verifyOtp(@Body(new ZodValidationPipe(VSVerifyOtp)) verifyOtp: verifyOtpSwagger) {
    return this.appService.verifyOtp(verifyOtp);
  }

  @Post("resend-otp")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Resend OTP" })
  @ApiResponse({ status: 201, description: "Berhasil kitim OTP" })
  @ApiResponse({ status: 400, description: "Gagal kirim OTP" })
  @ApiResponse({ status: 404, description: "Akun tidak ditemukan" })
  async resendOtp(
    @Body(new ZodValidationPipe(VSResendOtp))
    resendOtpSwagger: resendOtpSwagger,
  ) {
    return this.appService.resendOtp(resendOtpSwagger);
  }

  @Post("forgot-password")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Forgot Password" })
  @ApiResponse({ status: 201, description: "Berhasil kirim OTP" })
  @ApiResponse({
    status: 400,
    description: "Gagal mengirimkan kode verifikasi",
  })
  async forgotPassword(
    @Body(new ZodValidationPipe(VSForgotPassword))
    forgotPassword: forgotPasswordSwagger,
  ) {
    return this.appService.forgotPassword(forgotPassword);
  }

  @Post("verify-otp-password")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Verify OTP Reset Password" })
  @ApiResponse({ status: 200, description: "Berhasil verifikasi OTP" })
  @ApiResponse({ status: 400, description: "Gagal verifikasi OTP" })
  @ApiResponse({ status: 404, description: "Email atau OTP tidak valid" })
  async verifyOtpPassword(@Body(new ZodValidationPipe(VSVerifyOtp)) verifyOtp: verifyOtpSwagger) {
    return this.appService.verifyOtpPassword(verifyOtp);
  }

  @Post("reset-password")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Reset Password" })
  @ApiResponse({ status: 201, description: "Berhasil mengganti password" })
  @ApiResponse({ status: 400, description: "Gagal mengganti password" })
  async resetPassword(
    @Body(new ZodValidationPipe(VSNewPassword))
    newPasswordSwagger: newPasswordSwagger,
  ) {
    return this.appService.resetPassword(newPasswordSwagger);
  }
}
