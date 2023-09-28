import { BadRequestException, Injectable, Inject } from "@nestjs/common";
import {
  TLoginResponse,
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
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, firstValueFrom, throwError } from "rxjs";

@Injectable()
export class AuthService {
  constructor(@Inject("REDIS_SERVICE") private readonly client: ClientProxy) {}

  async register(payload: TRegisterRequest): Promise<TRegisterResponse> {
    const createdUser = await firstValueFrom(
      this.client
        .send("register", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );

    const msg = "verifikasi akun anda";

    const html = emailTemplate(createdUser.fullname, createdUser.otp, msg);

    const sendEmail = await firstValueFrom(
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

  async login({ app_origin, ...payload }: TLoginRequest): Promise<TLoginResponse> {
    const response = await firstValueFrom(
      this.client
        .send("login", { app_origin, ...payload })
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
    const user = await firstValueFrom(
      this.client
        .send("create_otp", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );

    const msg = "verifikasi akun anda";

    const html = emailTemplate(user?.fullname, user.otp, msg);

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
        .send("create_otp", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );

    const msg = "memperbarui kata sandi anda";

    const html = emailTemplate(user?.fullname, user?.otp, msg);

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
