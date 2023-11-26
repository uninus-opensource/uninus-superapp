import { Body, Controller, Post, Request, UseGuards, UsePipes } from "@nestjs/common";
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
import { ApiTags, ApiBody, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { RequestHeaders } from "@uninus/api/decorators";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @ApiOperation({ summary: "Register" })
  @Post("register")
  async register(
    @Body(new ZodValidationPipe(VSRegister))
    payload: RegisterDto,
  ) {
    return await this.appService.register(payload);
  }

  @ApiOperation({ summary: "Login" })
  @Post("login")
  async login(
    @RequestHeaders(new ZodValidationPipe(VSHeaderLogin)) headers: TVSHeaderLogin,
    @Body(new ZodValidationPipe(VSLogin)) payload: LoginDto,
  ) {
    const app_origin = headers["app-origin"];
    return await this.appService.login({ app_origin, ...payload });
  }

  @ApiOperation({ summary: "Logout" })
  @UsePipes(new ZodValidationPipe(VSLogout))
  async logout(@Body(new ZodValidationPipe(VSLogout)) payload: LogoutDto) {
    return await this.appService.logout(payload);
  }

  @ApiOperation({ summary: "Refresh Token" })
  @ApiBearerAuth("bearer")
  @ApiBody({ type: RefreshTokenDto })
  @Post("refresh")
  @UseGuards(RtGuard)
  async refresh(@Request() { user }: TReqToken) {
    return this.appService.refreshToken({ user });
  }

  @ApiOperation({ summary: "Verify OTP" })
  @Post("verify")
  async verifyOtp(@Body(new ZodValidationPipe(VSVerifyOtp)) payload: VerifyOtpDto) {
    return this.appService.verifyOtp(payload);
  }

  @ApiOperation({ summary: "Resend OTP" })
  @Post("resend-otp")
  async resendOtp(
    @Body(new ZodValidationPipe(VSResendOtp))
    payload: ResendOtpDto,
  ) {
    return this.appService.resendOtp(payload);
  }

  @ApiOperation({ summary: "Forgot Password" })
  @Post("forgot-password")
  async forgotPassword(
    @Body(new ZodValidationPipe(VSForgotPassword))
    payload: ForgotPasswordDto,
  ) {
    return this.appService.forgotPassword(payload);
  }

  @ApiOperation({ summary: "Verify OTP Reset Password" })
  @Post("verify-otp-password")
  async verifyOtpPassword(@Body(new ZodValidationPipe(VSVerifyOtp)) payload: VerifyOtpDto) {
    return this.appService.verifyOtpPassword(payload);
  }

  @ApiOperation({ summary: "Reset Password" })
  @Post("reset-password")
  async resetPassword(
    @Body(new ZodValidationPipe(VSNewPassword))
    payload: NewPasswordDto,
  ) {
    return this.appService.resetPassword(payload);
  }
}
