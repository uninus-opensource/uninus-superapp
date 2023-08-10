import { BadRequestException, Injectable, NotFoundException, Inject } from "@nestjs/common";
import {
  TLoginResponse,
  TProfileRequest,
  TProfileResponse,
  TRegisterRequest,
  TRegisterResponse,
  TReqToken,
  getEmailMessageTemplate,
  TResRefreshToken,
  TForgotPasswordResponse,
  TForgotPasswordRequest,
  TResetPasswordResponse,
  TResetPasswordRequest,
  TVerifyOtpRequest,
  TVerifyOtpResponse,
  TVerifyOtpPasswordRequest,
  TVerifyOtpPasswordResponse,
  TResendOtpRequest,
  TResendOtpResponse,
  TLogoutRequest,
  TLogoutResponse,
  TLoginRequest,
} from "@uninus/entities";
import { generateOtp, clearOtp } from "@uninus/api/utilities";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AuthService {
  constructor(@Inject("REDIS_SERVICE") private readonly client: ClientProxy) {}

  async getProfile(reqUser: TProfileRequest): Promise<TProfileResponse> {
    try {
      const response = await firstValueFrom(this.client.send("get_profile", reqUser));
      return response;
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  async register(data: TRegisterRequest): Promise<TRegisterResponse> {
    let createdUser: TProfileResponse;

    try {
      createdUser = await firstValueFrom(this.client.send<TProfileResponse>("register", data));
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }

    if (!createdUser) {
      throw new BadRequestException("Gagal Mendaftar");
    }
    const isCreateOtp = await generateOtp(createdUser?.email, createdUser?.id);

    if (!isCreateOtp) {
      throw new BadRequestException("Gagal membuat otp");
    }
    const msg = "verifikasi akun anda";

    const html = getEmailMessageTemplate(data.fullname, isCreateOtp?.token, msg);

    const sendEmail = firstValueFrom(
      this.client.send("send_email", {
        email: data.email.toLowerCase(),
        subject: "Verifikasi Email",
        html,
      }),
    );

    if (!sendEmail) {
      throw new BadRequestException("Gagal mengirimkan kode verifikasi");
    }

    return {
      message: "Akun Berhasil dibuat!, check email untuk verifikasi",
    };
  }

  async login(args: TLoginRequest): Promise<TLoginResponse> {
    try {
      const response = await firstValueFrom(this.client.send("login", args));
      return response;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  async logout(args: TLogoutRequest): Promise<TLogoutResponse> {
    try {
      const response = await firstValueFrom(this.client.send("logout", args));
      return response;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  async refreshToken(reqToken: TReqToken): Promise<TResRefreshToken> {
    try {
      const response = await firstValueFrom(this.client.send("refresh_token", reqToken));
      return response;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  async verifyOtp(args: TVerifyOtpRequest): Promise<TVerifyOtpResponse> {
    try {
      const response = await firstValueFrom(this.client.send("verify_otp", args));
      return response;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  async resendOtp(args: TResendOtpRequest): Promise<TResendOtpResponse> {
    await clearOtp();

    const user = await firstValueFrom(this.client.send("get_user_email", args.email));
    if (!user) {
      throw new NotFoundException("Akun tidak ditemukan");
    }

    const isCreateOtp = await generateOtp(user?.email, user?.id);

    if (!isCreateOtp) {
      throw new BadRequestException("Gagal membuat otp");
    }
    const msg = "verifikasi akun anda";

    const html = getEmailMessageTemplate(user?.fullname, isCreateOtp?.token, msg);

    const sendEmail = firstValueFrom(
      this.client.send("send_email", {
        email: args.email.toLowerCase(),
        subject: "Verifikasi Email",
        html,
      }),
    );

    if (!sendEmail) {
      throw new BadRequestException("Gagal mengirimkan kode verifikasi");
    }

    return {
      message: "Berhasil kirim OTP",
    };
  }

  async forgotPassword(data: TForgotPasswordRequest): Promise<TForgotPasswordResponse> {
    try {
      const response = await firstValueFrom(this.client.send("forget_password", data));
      return response;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  async verifyOtpPassword(args: TVerifyOtpPasswordRequest): Promise<TVerifyOtpPasswordResponse> {
    try {
      const response = await firstValueFrom(this.client.send("verify_otp_password", args));
      return response;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  async resetPassword(args: TResetPasswordRequest): Promise<TResetPasswordResponse> {
    try {
      const response = await firstValueFrom(this.client.send("reset_password", args));
      return response;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }
}
