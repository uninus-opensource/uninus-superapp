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
  TGoogleAuth,
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
import { and, desc, eq, ilike, lte } from "drizzle-orm";

@Injectable()
export class AppService {
  constructor(@Inject("drizzle") private drizzle: NodePgDatabase<typeof schema>) {}
  async googleAuth(payload: TGoogleAuth) {
    try {
      let user = await this.drizzle
        .select({
          id: schema.users.id,
          email: schema.users.email,
          fullname: schema.users.fullname,
          roleId: schema.users.roleId,
          avatar: schema.users.avatar,
          role: {
            name: schema.roles.name,
            permissions: schema.roles.permissions,
          },
        })
        .from(schema.users)
        .leftJoin(schema.roles, eq(schema.users.roleId, schema.roles.id))
        .where(eq(schema.users.email, payload.email))
        .limit(1)
        .then((res) => res.at(0));
      if (!user) {
        const [lastRegistrationNumber, roles] = await Promise.all([
          this.drizzle
            .select({
              registrationNumber: schema.admission.registrationNumber,
            })
            .from(schema.admission)
            .orderBy(desc(schema.admission.registrationNumber))
            .limit(1)
            .then((res) => res.at(0))
            .then((res) => {
              const date = new Date();
              let registrationCounter = 1;
              if (res?.registrationNumber) {
                registrationCounter = parseInt(res?.registrationNumber.substring(8)) + 1;
              }
              const formattedCounter = registrationCounter.toString().padStart(6, "0");
              return `${date.getFullYear().toString()}${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}${formattedCounter}`;
            }),
          this.drizzle
            .select({
              id: schema.roles.id,
              name: schema.roles.name,
              permissions: schema.roles.permissions,
            })
            .from(schema.roles)
            .where(ilike(schema.roles.name, "%Mahasiswa Baru%"))
            .limit(1)
            .then((res) => res.at(0)),
        ]);

        const insertUser = await this.drizzle
          .insert(schema.users)
          .values({
            fullname: payload.fullname,
            email: payload.email,
            password: "",
            avatar: payload.avatar,
            roleId: roles?.id,
          })
          .returning({
            id: schema.users.id,
            fullname: schema.users.fullname,
            email: schema.users.email,
            roleId: schema.users.roleId,
            avatar: schema.users.avatar,
          })
          .then((res) => res.at(0));

        const [insertStudent, getRegistrationStatus] = await Promise.all([
          this.drizzle
            .insert(schema.students)
            .values({
              userId: insertUser.id,
            })
            .returning({ id: schema.students.id })
            .then((res) => res.at(0)),
          this.drizzle
            .select({ id: schema.registrationStatus.id })
            .from(schema.registrationStatus)
            .where(ilike(schema.registrationStatus.name, "%Belum Mendaftar%"))
            .limit(1)
            .then((res) => res.at(0)),
        ]);
        const [insertAdmission] = await this.drizzle
          .insert(schema.admission)
          .values({
            registrationNumber: lastRegistrationNumber,
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
          !insertStudent ||
          !getRegistrationStatus ||
          !insertAdmission ||
          !insertStudentGrade
        ) {
          throw new BadRequestException("Gagal membuat akun");
        }
        user = {
          id: insertUser.id,
          email: insertUser.email,
          fullname: insertUser.fullname,
          roleId: insertUser.roleId,
          avatar: insertUser.avatar,
          role: {
            name: roles.name,
            permissions: roles.permissions,
          },
        };
      }
      const { accessToken, refreshToken } = await generateToken({
        sub: user.id,
        email: user.email,
        role: user?.role,
      });

      const expiresIn = 15 * 60 * 1000;
      const now = Date.now();
      const expirationTime = now + expiresIn;

      return {
        message: "Berhasil Login",
        token: {
          accessToken,
          exp: expirationTime,
          refreshToken,
        },
        id: user.id,
        user: {
          id: user.id,
          email: user.email,
          fullname: user.fullname,
          avatar: user.avatar,
          role: user.role,
        },
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async register(payload: TRegisterRequest): Promise<TRegisterResponse> {
    try {
      const [isEmailExist, isPhoneNumberExist, lastRegistrationNumber] = await Promise.all([
        this.drizzle
          .select({
            email: schema.users.email,
          })
          .from(schema.users)
          .where(eq(schema.users.email, payload.email))
          .limit(1)
          .then((res) => res.length),
        this.drizzle
          .select({
            phoneNumber: schema.students.phoneNumber,
          })
          .from(schema.students)
          .where(eq(schema.students.phoneNumber, `62${payload.phoneNumber}`))
          .limit(1)
          .then((res) => res.length),
        this.drizzle
          .select({
            registrationNumber: schema.admission.registrationNumber,
          })
          .from(schema.admission)
          .orderBy(desc(schema.admission.registrationNumber))
          .limit(1)
          .then((res) => res.at(0)),
      ]);
      if (isEmailExist || isPhoneNumberExist) {
        throw new ConflictException("Email atau nomor telepon sudah terdaftar");
      }
      const [password, { token, expiredAt }, registrationNumber, roles] = await Promise.all([
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
        this.drizzle
          .select({
            id: schema.roles.id,
          })
          .from(schema.roles)
          .where(ilike(schema.roles.name, "%Mahasiswa Baru%"))
          .limit(1)
          .then((res) => res.at(0)),
      ]);

      const insertUser = await this.drizzle
        .insert(schema.users)
        .values({
          fullname: payload.fullname,
          email: payload.email,
          password,
          avatar: "https://uninus-demo.s3.ap-southeast-1.amazonaws.com/avatar-default.png",
          roleId: roles?.id,
          updatedAt: new Date(),
        })
        .returning({ id: schema.users.id, fullname: schema.users.fullname })
        .then((res) => res.at(0));

      const [insertOtp, insertStudent, getRegistrationStatus] = await Promise.all([
        this.drizzle
          .insert(schema.otp)
          .values({
            token,
            expiredAt,
            userId: insertUser.id,
          })
          .returning({ token: schema.otp.token, id: schema.otp.id })
          .then((res) => res.at(0)),
        this.drizzle
          .insert(schema.students)
          .values({
            phoneNumber: `62${payload.phoneNumber}`,
            userId: insertUser.id,
          })
          .returning({ id: schema.students.id })
          .then((res) => res.at(0)),
        this.drizzle
          .select({ id: schema.registrationStatus.id })
          .from(schema.registrationStatus)
          .where(ilike(schema.registrationStatus.name, "%Belum Mendaftar%"))
          .limit(1)
          .then((res) => res.at(0)),
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

  async login(payload: TLoginRequest): Promise<TLoginResponse> {
    try {
      const user = await this.drizzle
        .select({
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
        .where(eq(schema.users.email, payload.email))
        .limit(1)
        .then((res) => res.at(0));

      const isMatch = user && (await comparePassword(payload.password as string, user.password));

      if (!user || !isMatch) {
        throw new UnauthorizedException("Email atau password tidak valid");
      }

      if (!user.isVerified) {
        throw new UnauthorizedException("Email belum terverifikasi");
      }

      const { accessToken, refreshToken } = await generateToken({
        sub: user.id,
        email: user.email,
        role: user?.role,
      });

      await this.drizzle
        .update(schema.users)
        .set({ refreshToken: refreshToken })
        .where(eq(schema.users.id, user.id));

      const expiresIn = 15 * 60 * 1000;
      const now = Date.now();
      const expirationTime = now + expiresIn;

      return {
        message: "Berhasil Login",
        token: {
          accessToken,
          exp: expirationTime,
          refreshToken,
        },
        id: user.id,
        user: {
          id: user.id,
          email: user.email,
          fullname: user.fullname,
          avatar: user.avatar,
          role: user.role,
        },
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async logout(payload: TLogoutRequest): Promise<TLogoutResponse> {
    try {
      const result = await this.drizzle
        .update(schema.users)
        .set({ refreshToken: null })
        .where(eq(schema.users.refreshToken, payload.refreshToken))
        .returning({ id: schema.users.id })
        .then((res) => res.at(0));
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
      const accessToken = await generateAccessToken(user);

      const now = Date.now();
      const expirationTime = now + expiresIn;

      return {
        accessToken,
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
        .returning({ token: schema.otp.token })
        .then((res) => res.at(0));
      if (!createOtp) {
        throw new BadRequestException("Gagal saat generate OTP");
      }
      return {
        fullname: user.fullname,
        otp: createOtp.token,
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
        })
        .from(schema.otp)
        .leftJoin(schema.users, eq(schema.otp.userId, schema.users.id))
        .where(and(eq(schema.otp.token, payload?.otp), eq(schema.users.id, user.id)));

      const isVerified = user && otp.length;
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
      .where(eq(schema.users.email, payload.email))
      .limit(1)
      .then((res) => res.at(0));
    if (!user) {
      throw new NotFoundException("Email tidak ditemukan");
    }

    return { id: user.id, email: user.email, fullname: user.fullname };
  }
}
