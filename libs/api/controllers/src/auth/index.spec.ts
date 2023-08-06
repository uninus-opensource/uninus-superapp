import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./";
import {
  AuthService,
  LoginSwagger,
  LogoutSwagger,
  RegisterSwagger,
  forgotPasswordSwagger,
  newPasswordSwagger,
  resendOtpSwagger,
  verifyOtpSwagger,
} from "@uninus/api/services";

describe("AuthController", () => {
  let controller: AuthController;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockAuthService = {
      register: jest.fn().mockResolvedValue({}),
      login: jest.fn().mockResolvedValue({}),
      logout: jest.fn().mockResolvedValue({}),
      verifyOtp: jest.fn().mockResolvedValue({}),
      resendOtp: jest.fn().mockResolvedValue({}),
      forgotPassword: jest.fn().mockResolvedValue({}),
      verifyOtpPassword: jest.fn().mockResolvedValue({}),
      resetPassword: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should register a user", async () => {
    const registerData: RegisterSwagger = {
      fullname: "example",
      email: "example@gmail.com",
      phone_number: "81221278393",
      password: "Example1234",
      role_id: 1,
    };
    const result = await controller.register(registerData);
    expect(result).toBeDefined();
    expect(mockAuthService.register).toHaveBeenCalledWith(registerData);
  });

  it("should login a user", async () => {
    const loginData: LoginSwagger = {
      email: "example@gmail.com",
      password: "Example1234",
    };
    const result = await controller.login(loginData);
    expect(result).toBeDefined();
    expect(mockAuthService.login).toHaveBeenCalledWith(loginData);
  });

  it("should logout a user", async () => {
    const logoutData: LogoutSwagger = {
      refresh_token: "string",
    };
    const result = await controller.logout(logoutData);
    expect(result).toBeDefined();
    expect(mockAuthService.logout).toHaveBeenCalledWith(logoutData);
  });

  it("should Verify user OTP", async () => {
    const verifyOtp: verifyOtpSwagger = {
      email: "example@gmail.com",
      otp: "123456",
    };
    const result = await controller.verifyOtp(verifyOtp);
    expect(result).toBeDefined();
    expect(mockAuthService.verifyOtp).toHaveBeenCalledWith(verifyOtp);
  });

  it("should Resend OTP", async () => {
    const resendOtp: resendOtpSwagger = {
      email: "example@gmail.com",
    };
    const result = await controller.resendOtp(resendOtp);
    expect(result).toBeDefined();
    expect(mockAuthService.resendOtp).toHaveBeenCalledWith(resendOtp);
  });

  it("Should Forgot Password", async () => {
    const forgotPassword: forgotPasswordSwagger = {
      email: "example@gmail.com",
    };
    const result = await controller.forgotPassword(forgotPassword);
    expect(result).toBeDefined();
    expect(mockAuthService.forgotPassword).toHaveBeenCalledWith(forgotPassword);
  });

  it("should Reset Password", async () => {
    const resetPassword: newPasswordSwagger = {
      email: "example@gmail.com",
      password: "Example1234",
    };
    const result = await controller.resetPassword(resetPassword);
    expect(result).toBeDefined();
    expect(mockAuthService.resetPassword).toHaveBeenCalledWith(resetPassword);
  });
});
