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
  TUserEmail,
  TVerifyOtpPasswordRequest,
  TVerifyOtpRequest,
} from "@uninus/entities";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern("login")
  login(payload: TLoginRequest) {
    return this.appService.login(payload);
  }

  @MessagePattern("register")
  register(payload: TRegisterRequest) {
    return this.appService.register(payload);
  }

  @MessagePattern("logout")
  logout(payload: TLogoutRequest) {
    return this.appService.logout(payload);
  }

  @MessagePattern("get_user_email")
  getUserEmail(payload: TUserEmail) {
    return this.appService.getEmailUser(payload);
  }

  @MessagePattern("refresh_token")
  refreshToken(payload: TReqToken) {
    return this.appService.refreshToken(payload);
  }

  @MessagePattern("verify_otp")
  verifyOtp(payload: TVerifyOtpRequest) {
    return this.appService.verifyOtp(payload);
  }

  @MessagePattern("forget_password")
  forgetPassword(payload: TForgotPasswordRequest) {
    return this.appService.forgotPassword(payload);
  }

  @MessagePattern("verify_otp_password")
  verifyOtpPassword(payload: TVerifyOtpPasswordRequest) {
    return this.appService.verifyOtpPassword(payload);
  }

  @MessagePattern("reset_password")
  resetPassword(payload: TResetPasswordRequest) {
    return this.appService.resetPassword(payload);
  }
}
