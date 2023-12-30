import {
  BadRequestException,
  ConflictException,
  Inject,
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
import {
  comparePassword,
  encryptPassword,
  generateAccessToken,
  generateToken,
  generateOtp,
  errorMappings,
} from "@uninus/api/utilities";
import { RpcException } from "@nestjs/microservices";
import * as schema from "@uninus/api/models";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { desc, eq, ilike, lte } from "drizzle-orm";
@Injectable()
export class AppService {
  constructor(@Inject("drizzle") private drizzle: NodePgDatabase<typeof schema>) {}

  async register(payload: TRegisterRequest): Promise<TRegisterResponse> {
    try {
      const [isEmailExist, isPhoneNumberExist, [lastRegistrationNumber], [roles]] =
        await Promise.all([
          this.drizzle
            .select({
              email: schema.users.email,
            })
            .from(schema.users)
            .where(eq(schema.users.email, payload.email)),
          this.drizzle
            .select({
              phoneNumber: schema.students.phoneNumber,
            })
            .from(schema.students)
            .where(eq(schema.students.phoneNumber, `62${payload.phone_number}`)),
          this.drizzle
            .select({
              registrationNumber: schema.admission.registrationNumber,
            })
            .from(schema.admission)
            .orderBy(desc(schema.admission.registrationNumber)),
          this.drizzle
            .select({
              id: schema.roles.id,
            })
            .from(schema.roles)
            .where(ilike(schema.roles.name, "%Mahasiswa Baru%"))
            .limit(1),
        ]);

      if (isEmailExist.length || isPhoneNumberExist.length) {
        throw new ConflictException("Email atau nomor telepon sudah terdaftar");
      }

      const [password, { token, expiredAt }, registrationNumber] = await Promise.all([
        encryptPassword(payload.password),
        generateOtp(),
        (() => {
          const date = new Date();
          let registrationCounter = 1;
          if (lastRegistrationNumber?.registrationNumber) {
            registrationCounter =
              parseInt(lastRegistrationNumber?.registrationNumber.substring(8)) + 1;
          }
          const formattedCounter = registrationCounter.toString().padStart(6, "0");
          return `${date.getFullYear().toString()}${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}${formattedCounter}`;
        })(),
      ]);

      const [insertUser] = await this.drizzle
        .insert(schema.users)
        .values({
          fullname: payload.fullname,
          email: payload.email,
          password,
          avatar: "https://uninus-demo.s3.ap-southeast-1.amazonaws.com/avatar-default.png",
          roleId: roles.id,
        })
        .returning({ id: schema.users.id, fullname: schema.users.fullname });

      const [[insertOtp], [insertStudent], [getRegistrationStatus]] = await Promise.all([
        this.drizzle
          .insert(schema.otp)
          .values({
            token,
            expiredAt,
            userId: insertUser.id,
          })
          .returning({ token: schema.otp.token, id: schema.otp.id }),
        this.drizzle
          .insert(schema.students)
          .values({
            phoneNumber: `62${payload.phone_number}`,
            userId: insertUser.id,
          })
          .returning({ id: schema.students.id }),
        this.drizzle
          .select({ id: schema.registrationStatus.id })
          .from(schema.registrationStatus)
          .where(ilike(schema.registrationStatus.name, "%Belum Mendaftar%"))
          .limit(1),
      ]);

      const [insertAdmission] = await this.drizzle
        .insert(schema.admission)
        .values({
          registrationNumber,
          registrationStatusId: getRegistrationStatus.id,
          studentId: insertStudent.id,
        })
        .returning({ id: schema.admission.id });

      const insertStudentGrade = await this.drizzle.insert(schema.studentGrade).values([
        {
          admissionId: insertAdmission.id,
          subject: "indonesia",
          semester: "1",
        },
        {
          admissionId: insertAdmission.id,
          subject: "indonesia",
          semester: "2",
        },
        {
          admissionId: insertAdmission.id,
          subject: "indonesia",
          semester: "3",
        },
        {
          admissionId: insertAdmission.id,
          subject: "indonesia",
          semester: "4",
        },
        {
          admissionId: insertAdmission.id,
          subject: "matematika",
          semester: "1",
        },
        {
          admissionId: insertAdmission.id,
          subject: "matematika",
          semester: "2",
        },
        {
          admissionId: insertAdmission.id,
          subject: "matematika",
          semester: "3",
        },
        {
          admissionId: insertAdmission.id,
          subject: "matematika",
          semester: "4",
        },
        {
          admissionId: insertAdmission.id,
          subject: "inggris",
          semester: "1",
        },
        {
          admissionId: insertAdmission.id,
          subject: "inggris",
          semester: "2",
        },
        {
          admissionId: insertAdmission.id,
          subject: "inggris",
          semester: "3",
        },
        {
          admissionId: insertAdmission.id,
          subject: "inggris",
          semester: "4",
        },
      ]);

      if (
        !insertUser ||
        !insertOtp ||
        !insertStudent ||
        !getRegistrationStatus ||
        !insertAdmission ||
        !insertStudentGrade
      ) {
        throw new BadRequestException("Gagal membuat akun");
      }

      return {
        fullname: insertUser.fullname,
        otp: insertOtp.token,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async login(payload: TLoginRequest & THeaderRequest): Promise<TLoginResponse> {
    try {
      const [user] = await this.drizzle
        .selectDistinct({
          id: schema.users.id,
          email: schema.users.email,
          fullname: schema.users.fullname,
          password: schema.users.password,
          roleId: schema.users.roleId,
          avatar: schema.users.avatar,
          isVerified: schema.users.isVerified,
          role: {
            name: schema.roles.name,
            permissions: schema.roles.permissions,
          },
        })
        .from(schema.users)
        .leftJoin(schema.roles, eq(schema.users.roleId, schema.roles.id))
        .where(eq(schema.users.email, payload.email));
      const { password, ...data } = user;

      const isMatch = user && (await comparePassword(payload.password as string, password));

      if (!user || !isMatch) {
        throw new UnauthorizedException("Email atau password tidak valid");
      }

      if (!data.isVerified) {
        throw new UnauthorizedException("Email belum terverifikasi");
      }

      const { access_token, refresh_token } = await generateToken({
        sub: data.id,
        email: data.email,
        role: data?.role,
      });

      await this.drizzle
        .update(schema.users)
        .set({ refreshToken: refresh_token })
        .where(eq(schema.users.id, data.id));

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
        id: data.id,
        user: {
          id: data.id,
          email: data.email,
          fullname: data.fullname,
          avatar: data.avatar,
          isVerified: data.isVerified,
          role: data.role.name,
        },
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async logout(payload: TLogoutRequest): Promise<TLogoutResponse> {
    try {
      const result = await this.drizzle
        .delete(schema.users)
        .where(eq(schema.users.refreshToken, payload.refresh_token));
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
      const user = await this.finduserByEmail({ email: payload.email });
      const { token, expiredAt } = await generateOtp();
      const createOtp = await this.drizzle
        .insert(schema.otp)
        .values({
          token,
          expiredAt,
          userId: user.id,
        })
        .returning({ token: schema.otp.token });
      if (!createOtp) {
        throw new BadRequestException("Gagal saat generate OTP");
      }
      return {
        fullname: user.fullname,
        otp: createOtp[0].token,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async clearOtp() {
    try {
      await this.drizzle.delete(schema.otp).where(lte(schema.otp.expiredAt, new Date()));
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async verifyOtp(payload: TVerifyOtpRequest): Promise<TVerifyOtpResponse> {
    try {
      await this.clearOtp();
      const user = await this.finduserByEmail({ email: payload?.email });
      const otp = await this.drizzle
        .select({
          token: schema.otp.token,
          expiredAt: schema.otp.expiredAt,
        })
        .from(schema.otp)
        .where(eq(schema.otp.userId, user.id));

      const isVerified = user.email === payload.email && otp[0].token === payload.otp;
      if (!isVerified) {
        throw new UnauthorizedException("Email atau OTP tidak valid");
      }

      const updateUser = await this.drizzle
        .update(schema.users)
        .set({ isVerified: true })
        .where(eq(schema.users.id, user.id));

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

      await this.finduserByEmail({ email: payload?.email });

      const user = await this.drizzle
        .update(schema.users)
        .set({ password: newPassword })
        .where(eq(schema.users.email, payload.email));

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
  async finduserByEmail(payload: TUserEmail): Promise<TUserEmailResponse> {
    const user = await this.drizzle
      .select({
        id: schema.users.id,
        email: schema.users.email,
        fullname: schema.users.fullname,
      })
      .from(schema.users)
      .where(eq(schema.users.email, payload.email));
    if (!user) {
      throw new NotFoundException("Email tidak ditemukan");
    }

    return { id: user[0].id, email: user[0].email, fullname: user[0].fullname };
  }
}
