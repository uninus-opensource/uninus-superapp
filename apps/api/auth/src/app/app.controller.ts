import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import {
  TForgotPasswordRequest,
  TLoginRequest,
  TLogoutRequest,
  TProfileResponse,
  TRegisterRequest,
  TReqToken,
  TResetPasswordRequest,
  TVerifyOtpPasswordRequest,
  TVerifyOtpRequest,
} from "@uninus/entities";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern("login")
  async login(args: TLoginRequest) {
    return await this.appService.login(args);
  }

  @MessagePattern("register")
  register(args: TRegisterRequest) {
    return this.appService.register(args);
  }

  @MessagePattern("get_profile")
  getProfile(args: TProfileResponse) {
    return this.appService.getProfile(args);
  }

  @MessagePattern("logout")
  logout(args: TLogoutRequest) {
    return this.appService.logout(args);
  }

  @MessagePattern("refreshToken")
  refreshToken(args: TReqToken) {
    return this.appService.refreshToken(args);
  }

  @MessagePattern("verify_otp")
  verifyOtp(args: TVerifyOtpRequest) {
    return this.appService.verifyOtp(args);
  }

  @MessagePattern("forget_password")
  forgetPassword(args: TForgotPasswordRequest) {
    return this.appService.forgotPassword(args);
  }

  @MessagePattern("verify_otp_password")
  verifyOtpPassword(args: TVerifyOtpPasswordRequest) {
    return this.appService.verifyOtpPassword(args);
  }

  @MessagePattern("reset_password")
  resetPassword(args: TResetPasswordRequest) {
    return this.appService.resetPassword(args);
  }
}
