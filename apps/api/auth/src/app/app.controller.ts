import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import {
  TLoginRequest,
  TLogoutRequest,
  TRegisterRequest,
  TReqToken,
  TResetPasswordRequest,
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

  @MessagePattern("refresh_token")
  async refreshToken(payload: TReqToken) {
    return await this.appService.refreshToken(payload);
  }

  @MessagePattern("verify_otp")
  async verifyOtp(payload: TVerifyOtpRequest) {
    return await this.appService.verifyOtp(payload);
  }

  @MessagePattern("resend_otp")
  async createOtpUser(payload) {
    return await this.appService.createOtpUser(payload);
  }

  @MessagePattern("reset_password")
  async resetPassword(payload: TResetPasswordRequest) {
    return await this.appService.resetPassword(payload);
  }
}
