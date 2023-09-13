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
  async login(payload: TLoginRequest) {
    return await this.appService.login(payload);
  }

  @MessagePattern("register")
  async register(payload: TRegisterRequest) {
    return await this.appService.register(payload);
  }

  @MessagePattern("logout")
  async logout(payload: TLogoutRequest) {
    return await this.appService.logout(payload);
  }

  @MessagePattern("get_user_email")
  async getUserEmail(payload: TUserEmail) {
    return await this.appService.getUserByEmail(payload);
  }

  @MessagePattern("refresh_token")
  async refreshToken(payload: TReqToken) {
    return await this.appService.refreshToken(payload);
  }

  @MessagePattern("verify_otp")
  async verifyOtp(payload: TVerifyOtpRequest) {
    return await this.appService.verifyOtp(payload);
  }

  @MessagePattern("create_otp")
  async createOtpUser(payload) {
    return await this.appService.createOtpUser(payload);
  }

  @MessagePattern("forget_password")
  async forgetPassword(payload: TForgotPasswordRequest) {
    return await this.appService.forgotPassword(payload);
  }

  @MessagePattern("verify_otp_password")
  async verifyOtpPassword(payload: TVerifyOtpPasswordRequest) {
    return await this.appService.verifyOtpPassword(payload);
  }

  @MessagePattern("reset_password")
  async resetPassword(payload: TResetPasswordRequest) {
    return await this.appService.resetPassword(payload);
  }
}
