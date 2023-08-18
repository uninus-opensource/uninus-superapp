import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from ".";
import { AuthService } from "@uninus/api/services";
import {
  TForgotPasswordRequest,
  TForgotPasswordResponse,
  TLoginRequest,
  TLoginResponse,
  TLogoutRequest,
  TLogoutResponse,
  TRegisterRequest,
  TRegisterResponse,
  TReqToken,
  TResRefreshToken,
  TResendOtpRequest,
  TResendOtpResponse,
  TResetPasswordRequest,
  TResetPasswordResponse,
  TVerifyOtpPasswordRequest,
  TVerifyOtpPasswordResponse,
  TVerifyOtpRequest,
  TVerifyOtpResponse,
} from "@uninus/entities";

describe("AuthController", () => {
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
            logout: jest.fn(),
            refreshToken: jest.fn(),
            verifyOtp: jest.fn(),
            resendOtp: jest.fn(),
            forgotPassword: jest.fn(),
            verifyOtpPassword: jest.fn(),
            resetPassword: jest.fn(),
          },
        },
      ],
    }).compile();
  });

  describe("register", () => {
    it("should register a user and return 201 Created", async () => {
      const authController = app.get<AuthController>(AuthController);
      const authService = app.get<AuthService>(AuthService);

      const payload: TRegisterRequest = {
        fullname: "Rian Testing",
        email: "RianTesting@gmail.com",
        password: "TestPass123",
        phone_number: "82113929860",
      };

      const expectedResult: TRegisterResponse = {
        message: "Akun Berhasil dibuat!, check email untuk verifikasi",
      };

      (authService.register as jest.Mock).mockResolvedValue(expectedResult);

      const response = await authController.register(payload);
      expect(response).toEqual(expectedResult);
    });
  });

  describe("login", () => {
    it("should login a user and return 200", async () => {
      const authController = app.get<AuthController>(AuthController);
      const authService = app.get<AuthService>(AuthService);

      const payload: TLoginRequest = {
        email: "RianTesting@gmail.com",
        password: "TestPass123",
      };

      const expectedResult: TLoginResponse = {
        message: "Berhasil Login",
        token: {
          access_token: "eyaodbnbawidbkawbdksbajkbwdjsbakwbdua",
          exp: 1234323235,
          refresh_token: "ey812482374r23874826kjsbdkjbsdkfjbsd3462",
        },
        id: "124124214342",
        user: {
          id: "1212432hdjbdkvbse7234235",
          email: "RianTesting@gmail.com",
          fullname: "Rian Testing",
          role: "Developer" || "",
          createdAt: new Date(),
          avatar: "https://www.google.com/",
          isVerified: true,
        },
      };

      (authService.login as jest.Mock).mockResolvedValue(expectedResult);

      const response = await authController.login(payload);
      expect(response).toEqual(expectedResult);
    });
  });

  describe("logout", () => {
    it("should logout a user and return 200", async () => {
      const authController = app.get<AuthController>(AuthController);
      const authService = app.get<AuthService>(AuthService);

      const payload: TLogoutRequest = {
        refresh_token: "eyd198yhidaobfagiuwvdiuasvfaiwdiugaskdga",
      };

      const expectedResult: TLogoutResponse = {
        message: "Berhasil logout",
      };

      (authService.logout as jest.Mock).mockResolvedValue(expectedResult);

      const response = await authController.logout(payload);
      expect(response).toEqual(expectedResult);
    });
  });

  describe("refresh", () => {
    it("should refresh token and return 200", async () => {
      const authController = app.get<AuthController>(AuthController);
      const authService = app.get<AuthService>(AuthService);

      const payload: TReqToken = {
        user: {
          sub: "1874t8tgfuslgfa87wtf7alwe",
          email: "RianTesting@gmail.com",
          role: "Developer",
        },
      };

      const expectedResult: TResRefreshToken = {
        access_token: "eyaocbaowlbliaubfjbabwfilsuvefjsbjg",
        exp: 1928649324,
      };

      (authService.refreshToken as jest.Mock).mockResolvedValue(expectedResult);

      const response = await authController.refresh(payload);
      expect(response).toEqual(expectedResult);
    });
  });

  describe("verify", () => {
    it("should verify otp and return status 200", async () => {
      const authController = app.get<AuthController>(AuthController);
      const authService = app.get<AuthService>(AuthService);

      const payload: TVerifyOtpRequest = {
        email: "RianTesting@gmail.com",
        otp: "123123",
      };

      const expectedResult: TVerifyOtpResponse = {
        message: "Berhasil verifikasi OTP",
      };

      (authService.verifyOtp as jest.Mock).mockResolvedValue(expectedResult);

      const response = await authController.verifyOtp(payload);
      expect(response).toEqual(expectedResult);
    });
  });

  describe("resend-otp", () => {
    it("should resend otp and return status 200", async () => {
      const authController = app.get<AuthController>(AuthController);
      const authService = app.get<AuthService>(AuthService);

      const payload: TResendOtpRequest = {
        email: "RianTesting@gmail.com",
      };

      const expectedResult: TResendOtpResponse = {
        message: "Berhasil kirim OTP",
      };

      (authService.resendOtp as jest.Mock).mockResolvedValue(expectedResult);

      const response = await authController.resendOtp(payload);
      expect(response).toEqual(expectedResult);
    });
  });

  describe("forgot-password", () => {
    it("should send otp and return status 200", async () => {
      const authController = app.get<AuthController>(AuthController);
      const authService = app.get<AuthService>(AuthService);

      const payload: TForgotPasswordRequest = {
        email: "RianTesting@gmail.com",
      };

      const expectedResult: TForgotPasswordResponse = {
        message: "Berhasil kirim OTP",
      };

      (authService.forgotPassword as jest.Mock).mockResolvedValue(expectedResult);

      const response = await authController.forgotPassword(payload);
      expect(response).toEqual(expectedResult);
    });
  });

  describe("verify-otp-password", () => {
    it("should send otp and return status 200", async () => {
      const authController = app.get<AuthController>(AuthController);
      const authService = app.get<AuthService>(AuthService);

      const payload: TVerifyOtpPasswordRequest = {
        email: "RianTesting@gmail.com",
        otp: "123123",
      };

      const expectedResult: TVerifyOtpPasswordResponse = {
        message: "Berhasil verifikasi OTP",
      };

      (authService.verifyOtpPassword as jest.Mock).mockResolvedValue(expectedResult);

      const response = await authController.verifyOtpPassword(payload);
      expect(response).toEqual(expectedResult);
    });
  });

  describe("reset-password", () => {
    it("should reset the password and return status 200", async () => {
      const authController = app.get<AuthController>(AuthController);
      const authService = app.get<AuthService>(AuthService);

      const payload: TResetPasswordRequest = {
        email: "RianTesting@gmail.com",
        password: "RianPass123",
      };

      const expectedResult: TResetPasswordResponse = {
        message: "Berhasil mengganti password",
      };

      (authService.resetPassword as jest.Mock).mockResolvedValue(expectedResult);

      const response = await authController.resetPassword(payload);
      expect(response).toEqual(expectedResult);
    });
  });
});
