import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Inject,
} from "@nestjs/common";
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
import {
  generateOtp,
  clearOtp,
} from "@uninus/api/utilities";
import {ClientProxy} from "@nestjs/microservices"
import { firstValueFrom } from "rxjs";

@Injectable()
export class AuthService {
  constructor(
    @Inject('REDIS_SERVICE') private readonly client: ClientProxy
  ) {}

  async getProfile(reqUser: TProfileRequest): Promise<TProfileResponse> {
    return firstValueFrom(this.client.send("get_profile", reqUser))
  }

  async register(data: TRegisterRequest): Promise<TRegisterResponse> {
    const createdUser = await firstValueFrom(this.client.send<TProfileResponse>('register',data))

    if (!createdUser) {
      throw new BadRequestException("Gagal Mendaftar");
    }
    const isCreateOtp = await generateOtp(createdUser?.email, createdUser?.id);

    if (!isCreateOtp) {
      throw new BadRequestException("Gagal membuat otp");
    }
    const msg = "verifikasi akun anda";

    const html = getEmailMessageTemplate(data.fullname, isCreateOtp?.token, msg);

    const sendEmail = firstValueFrom(this.client.send("send_email",{
      email:data.email.toLowerCase(),
      subject:"Verifikasi Email",
      html,
    }));

    if (!sendEmail) {
      throw new BadRequestException("Gagal mengirimkan kode verifikasi");
    }

    return {
      message: "Akun Berhasil dibuat!, check email untuk verifikasi",
    };
  }

  async login(args: TLoginRequest): Promise<TLoginResponse> {
    return firstValueFrom(this.client.send("login", args))
  }

  async logout(args: TLogoutRequest): Promise<TLogoutResponse> {
    return firstValueFrom(this.client.send("logout", args))
  }

  async refreshToken(reqToken: TReqToken): Promise<TResRefreshToken> {
    return firstValueFrom(this.client.send("refresh_token", reqToken))
  }

  async verifyOtp(args: TVerifyOtpRequest): Promise<TVerifyOtpResponse> {
    return firstValueFrom(this.client.send("verify_otp", args))
  }

  async resendOtp(args: TResendOtpRequest): Promise<TResendOtpResponse> {
    await clearOtp();
    const user = await firstValueFrom(this.client.send("get_user_email", args.email))
    if (!user) {
      throw new NotFoundException("Akun tidak ditemukan");
    }

    const isCreateOtp = await generateOtp(user?.email, user?.id);

    if (!isCreateOtp) {
      throw new BadRequestException("Gagal membuat otp");
    }
    const msg = "verifikasi akun anda";

    const html = getEmailMessageTemplate(user?.fullname, isCreateOtp?.token, msg);

    const sendEmail = firstValueFrom(this.client.send("send_email",{
      email:args.email.toLowerCase(),
      subject:"Verifikasi Email",
      html,
    }))

    if (!sendEmail) {
      throw new BadRequestException("Gagal mengirimkan kode verifikasi");
    }

    return {
      message: "Berhasil kirim OTP",
    };
  }

  async forgotPassword(data: TForgotPasswordRequest): Promise<TForgotPasswordResponse> {
    return firstValueFrom(this.client.send("forget_password", data))
  }

  async verifyOtpPassword(args: TVerifyOtpPasswordRequest): Promise<TVerifyOtpPasswordResponse> {
    return firstValueFrom(this.client.send("verify_otp_password", args))
  }

  async resetPassword(args: TResetPasswordRequest): Promise<TResetPasswordResponse> {
    return firstValueFrom(this.client.send("reset_password", args))
  }
}
