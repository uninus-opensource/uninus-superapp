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
  TVSHeaderLogin,
  VSHeaderLogin,
} from "@uninus/entities";
import { RtGuard } from "@uninus/api/guard";
import { ZodValidationPipe } from "@uninus/api/pipes";
import { AuthService } from "@uninus/api/services";
import {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  LogoutDto,
  ResendOtpDto,
  NewPasswordDto,
  VerifyOtpDto,
  RefreshTokenDto,
} from "@uninus/api/dto";
import { RpcExceptionToHttpExceptionFilter } from "@uninus/api/pipes";
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiHeader,
} from "@nestjs/swagger";
import { RequestHeaders } from "@uninus/api/decorators";

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
  @ApiResponse({ status: 409, description: "Email atau nomor telepon sudah terdaftar" })
  @Post("register")
  @UsePipes(new ZodValidationPipe(VSRegister))
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async register(
    @Body()
    payload: RegisterDto,
  ) {
    return await this.appService.register(payload);
  }

  @ApiOperation({ summary: "Login" })
  @ApiResponse({
    status: 201,
    description: "Berhasil Login",
  })
  @ApiResponse({ status: 401, description: "Email atau Password tidak valid" })
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
  })
  @Post("login")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async login(
    @RequestHeaders(new ZodValidationPipe(VSHeaderLogin)) headers: TVSHeaderLogin,
    @Body(new ZodValidationPipe(VSLogin)) payload: LoginDto,
  ) {
    const app_origin = headers["app-origin"];
    return await this.appService.login({ app_origin, ...payload });
  }

  @ApiOperation({ summary: "Logout" })
  @ApiResponse({ status: 201, description: "Berhasil logout" })
  @ApiResponse({ status: 401, description: "Gagal logout" })
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
  })
  @Post("logout")
  @UsePipes(new ZodValidationPipe(VSLogout))
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async logout(@Body() payload: LogoutDto) {
    return await this.appService.logout(payload);
  }

  @ApiOperation({ summary: "Refresh Token" })
  @ApiBearerAuth()
  @ApiBody({ type: RefreshTokenDto })
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
  async verifyOtp(@Body() payload: VerifyOtpDto) {
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
    payload: ResendOtpDto,
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
    payload: ForgotPasswordDto,
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
  async verifyOtpPassword(@Body() payload: VerifyOtpDto) {
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
    payload: NewPasswordDto,
  ) {
    return this.appService.resetPassword(payload);
  }
}
