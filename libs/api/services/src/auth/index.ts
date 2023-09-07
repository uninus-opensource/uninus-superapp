import { BadRequestException, Injectable, NotFoundException, Inject } from "@nestjs/common";
import {
  TLoginResponse,
  TProfileResponse,
  TRegisterRequest,
  TRegisterResponse,
  TReqToken,
  emailTemplate,
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
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, firstValueFrom, throwError } from "rxjs";

@Injectable()
export class AuthService {
  constructor(@Inject("REDIS_SERVICE") private readonly client: ClientProxy) {}

  async register(payload: TRegisterRequest): Promise<TRegisterResponse> {
    const createdUser: TProfileResponse = await firstValueFrom(
      this.client
        .send<TProfileResponse>("register", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );

    if (!createdUser) {
      throw new BadRequestException("Gagal Mendaftar");
    }
    const isCreateOtp = await generateOtp(createdUser?.email, createdUser?.id);

    if (!isCreateOtp) {
      throw new BadRequestException("Gagal membuat otp");
    }
    const msg = "verifikasi akun anda";

    const html = emailTemplate(payload.fullname, isCreateOtp?.token, msg);

    const sendEmail = firstValueFrom(
      this.client
        .send("send_email", {
          email: payload.email,
          subject: "Verifikasi Email",
          html,
        })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );

    if (!sendEmail) {
      throw new BadRequestException("Gagal mengirimkan kode verifikasi");
    }

    return {
      message: "Akun Berhasil dibuat!, check email untuk verifikasi",
    };
  }

  async login(payload: TLoginRequest): Promise<TLoginResponse> {
    const response = await firstValueFrom(
      this.client
        .send("login", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async logout(payload: TLogoutRequest): Promise<TLogoutResponse> {
    const response = await firstValueFrom(
      this.client
        .send("logout", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async refreshToken(payload: TReqToken): Promise<TResRefreshToken> {
    const response = await firstValueFrom(
      this.client
        .send("refresh_token", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async verifyOtp(payload: TVerifyOtpRequest): Promise<TVerifyOtpResponse> {
    const response = await firstValueFrom(
      this.client
        .send("verify_otp", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async resendOtp(payload: TResendOtpRequest): Promise<TResendOtpResponse> {
    await clearOtp();

    const user = await firstValueFrom(
      this.client
        .send("get_user_email", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    if (!user) {
      throw new NotFoundException("Akun tidak ditemukan");
    }

    const isCreateOtp = await generateOtp(user?.email, user?.id);

    if (!isCreateOtp) {
      throw new BadRequestException("Gagal membuat otp");
    }
    const msg = "verifikasi akun anda";

    const html = emailTemplate(user?.fullname, isCreateOtp?.token, msg);

    const sendEmail = firstValueFrom(
      this.client
        .send("send_email", {
          email: payload.email,
          subject: "Verifikasi Email",
          html,
        })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );

    if (!sendEmail) {
      throw new BadRequestException("Gagal mengirimkan kode verifikasi");
    }

    return {
      message: "Berhasil kirim OTP",
    };
  }

  async forgotPassword(payload: TForgotPasswordRequest): Promise<TForgotPasswordResponse> {
    const user = await firstValueFrom(
      this.client
        .send("forget_password", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );

    const msg = "memperbarui kata sandi anda";

    if (!user) {
      throw new NotFoundException("Akun tidak ditemukan");
    }

    const isCreateOtp = await generateOtp(user?.email, user?.id);
    if (!isCreateOtp) {
      throw new BadRequestException("Gagal membuat otp");
    }
    const html = emailTemplate(user?.fullname ?? "", isCreateOtp?.token, msg);

    const sendEmail = firstValueFrom(
      this.client
        .send("send_email", {
          email: payload.email,
          subject: "Reset Password",
          html,
        })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );

    if (!sendEmail) {
      throw new BadRequestException("Gagal mengirimkan kode verifikasi");
    }

    return {
      message: "Berhasil kirim OTP",
    };
  }

  async verifyOtpPassword(payload: TVerifyOtpPasswordRequest): Promise<TVerifyOtpPasswordResponse> {
    const response = await firstValueFrom(
      this.client
        .send("verify_otp_password", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async resetPassword(payload: TResetPasswordRequest): Promise<TResetPasswordResponse> {
    const response = await firstValueFrom(
      this.client
        .send("reset_password", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
}
