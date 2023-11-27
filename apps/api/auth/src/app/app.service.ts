import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import {
  TLoginResponse,
  TRegisterRequest,
  TReqToken,
  TResRefreshToken,
  TResetPasswordResponse,
  TResetPasswordRequest,
  TVerifyOtpRequest,
  TVerifyOtpResponse,
  TLogoutRequest,
  TLogoutResponse,
  TLoginRequest,
  TUserEmail,
  TUserEmailResponse,
  TRegisterResponse,
  THeaderRequest,
} from "@uninus/entities";
import { PrismaService } from "@uninus/api/services";
import {
  comparePassword,
  encryptPassword,
  generateAccessToken,
  generateToken,
  generateOtp,
  errorMappings,
} from "@uninus/api/utilities";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async register(payload: TRegisterRequest): Promise<TRegisterResponse> {
    try {
      const isUserExist = await this.prisma.users.findMany({
        where: {
          OR: [
            {
              email: payload.email,
            },
            {
              students: {
                phone_number: `62${payload.phone_number}`,
              },
            },
          ],
        },
      });

      if (isUserExist.length) {
        throw new ConflictException("Email atau nomor telepon sudah terdaftar");
      }

      const password = await encryptPassword(payload.password);
      const now = new Date();
      const year = now.getFullYear().toString();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");

      const lastRegistration = await this.prisma.pMB.findFirst({
        orderBy: { registration_number: "desc" },
      });

      let registrationCounter = 1;
      if (lastRegistration) {
        registrationCounter = parseInt(lastRegistration.registration_number.substring(8)) + 1;
      }

      const formattedCounter = registrationCounter.toString().padStart(6, "0");

      const registrationNumber = `${year}${month}${day}${formattedCounter}`;
      const { token, expiredAt } = await generateOtp();
      const createUser = await this.prisma.users.create({
        data: {
          fullname: payload.fullname,
          email: payload.email.toLowerCase(),
          password,
          otp: {
            create: {
              token,
              expiredAt,
            },
          },
          avatar: "https://uninus-demo.s3.ap-southeast-1.amazonaws.com/avatar-default.png",
          students: {
            create: {
              phone_number: `62${payload.phone_number}`,
              pmb: {
                create: {
                  registration_number: registrationNumber,
                  registration_status_id: 1,
                  student_grade: {
                    createMany: {
                      data: [
                        {
                          subject: "indonesia",
                          semester: "1",
                        },
                        {
                          subject: "indonesia",
                          semester: "2",
                        },
                        {
                          subject: "indonesia",
                          semester: "3",
                        },
                        {
                          subject: "indonesia",
                          semester: "4",
                        },
                        {
                          subject: "matematika",
                          semester: "1",
                        },
                        {
                          subject: "matematika",
                          semester: "2",
                        },
                        {
                          subject: "matematika",
                          semester: "3",
                        },
                        {
                          subject: "matematika",
                          semester: "4",
                        },
                        {
                          subject: "inggris",
                          semester: "1",
                        },
                        {
                          subject: "inggris",
                          semester: "2",
                        },
                        {
                          subject: "inggris",
                          semester: "3",
                        },
                        {
                          subject: "inggris",
                          semester: "4",
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
        select: {
          fullname: true,
          otp: {
            select: {
              token: true,
            },
          },
        },
      });

      if (!createUser) {
        throw new BadRequestException("Gagal membuat akun");
      }

      return {
        fullname: createUser.fullname,
        otp: createUser.otp.token,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async login(payload: TLoginRequest & THeaderRequest): Promise<TLoginResponse> {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          email: payload.email,
        },
        select: {
          id: true,
          email: true,
          fullname: true,
          password: true,
          refresh_token: true,
          role_id: true,
          createdAt: true,
          avatar: true,
          isVerified: true,
          role: {
            include: {
              appsOrigin: true,
            },
          },
        },
      });

      const isMatch = user && (await comparePassword(payload.password as string, user.password));

      if (!user || !isMatch) {
        throw new UnauthorizedException("Email atau password tidak valid");
      }
      const userPermission = user?.role?.appsOrigin.map((el) => el.name);
      const isHashPermission = userPermission.includes(payload.app_origin);

      if (!isHashPermission) {
        throw new ForbiddenException("Anda tidak memiliki akses ke aplikasi ini");
      }

      if (!user.isVerified) {
        throw new UnauthorizedException("Email belum terverifikasi");
      }

      const { access_token, refresh_token } = await generateToken({
        sub: user.id,
        email: user.email,
        role: user?.role?.name,
      });
      const expiresIn = 15 * 60 * 1000;
      const now = Date.now();
      const expirationTime = now + expiresIn;

      return {
        message: "Berhasil Login",
        token: {
          access_token,
          exp: expirationTime,
          refresh_token,
        },
        id: user.id,
        user: {
          id: user.id,
          email: user.email,
          fullname: user.fullname,
          role: user?.role?.name,
          createdAt: user.createdAt,
          avatar: user.avatar,
          isVerified: user.isVerified,
        },
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async logout(payload: TLogoutRequest): Promise<TLogoutResponse> {
    try {
      const result = await this.prisma.users.updateMany({
        where: {
          refresh_token: payload.refresh_token,
        },
        data: {
          refresh_token: null,
        },
      });

      if (!result) {
        throw new UnauthorizedException("Gagal Logout");
      }

      return {
        message: "Berhasil logout",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async refreshToken({ user }: TReqToken): Promise<TResRefreshToken> {
    try {
      const expiresIn = 15 * 60 * 1000;
      const access_token = await generateAccessToken(user);

      const now = Date.now();
      const expirationTime = now + expiresIn;

      return {
        access_token,
        exp: expirationTime,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async createOtpUser(payload: TUserEmail) {
    try {
      await this.clearOtp();
      await this.getUserByEmail(payload);
      const { token, expiredAt } = await generateOtp();
      const createOtp = await this.prisma.users.update({
        where: {
          email: payload.email,
        },
        data: {
          otp: {
            upsert: {
              update: {
                token,
                expiredAt,
              },
              create: {
                token,
                expiredAt,
              },
            },
          },
        },
        select: {
          fullname: true,
          otp: {
            select: {
              token: true,
            },
          },
        },
      });
      if (!createOtp) {
        throw new BadRequestException("Gagal saat generate OTP");
      }
      return {
        fullname: createOtp.fullname,
        otp: createOtp.otp?.token,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async clearOtp() {
    try {
      const clearOtp = await this.prisma.oTP.deleteMany({
        where: {
          expiredAt: {
            lte: new Date().getTime(),
          },
        },
      });
      if (!clearOtp) {
        throw new BadGatewayException("Gagal menghapus OTP");
      }
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async verifyOtp(payload: TVerifyOtpRequest): Promise<TVerifyOtpResponse> {
    try {
      await this.clearOtp();
      const user = await this.getUserByEmail({ email: payload?.email });
      const isVerified = user.email === payload.email && user.otp === payload.otp;
      if (!isVerified) {
        throw new UnauthorizedException("Email atau OTP tidak valid");
      }

      const updateUser = await this.prisma.users.update({
        where: {
          email: payload.email,
        },
        data: {
          isVerified: true,
        },
      });

      if (!updateUser) {
        throw new BadRequestException("Gagal verifikasi OTP");
      }
      return {
        message: "Berhasil verifikasi OTP",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async resetPassword(payload: TResetPasswordRequest): Promise<TResetPasswordResponse> {
    try {
      const newPassword = await encryptPassword(payload.password);

      await this.getUserByEmail({ email: payload?.email });

      const user = await this.prisma.users.update({
        where: {
          email: payload.email,
        },
        data: {
          password: newPassword,
        },
      });

      if (!user) {
        throw new BadRequestException("Gagal mengganti password");
      }
      return {
        message: "Berhasil mengganti password",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getUserByEmail(payload: TUserEmail): Promise<TUserEmailResponse> {
    const user = await this.prisma.users.findUnique({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
        email: true,
        fullname: true,
        otp: {
          select: {
            token: true,
          },
        },
      },
    });
    if (!user) {
      throw new NotFoundException("Email tidak ditemukan");
    }

    return { id: user.id, email: user.email, otp: user.otp?.token };
  }
}
