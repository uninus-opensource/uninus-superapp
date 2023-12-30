import {
  BadRequestException,
  Injectable,
  ConflictException,
  NotFoundException,
  Inject,
} from "@nestjs/common";
import {
  EAppsOrigin,
  ISelectRequest,
  IUserRequest,
  IUserResponse,
  TCreateNotificationRequest,
  TCreateNotificationResponse,
  TCreateUserRequest,
  TGetNotificationResponse,
  TIdUser,
  TRolesResponse,
  TUsersPaginationArgs,
  TUsersPaginatonResponse,
} from "@uninus/entities";
import { PrismaService } from "@uninus/api/services";
import { encryptPassword, errorMappings, generateOtp } from "@uninus/api/utilities";
import { RpcException } from "@nestjs/microservices";
import * as schema from "@uninus/api/models";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { desc, eq, ilike, or } from "drizzle-orm";
@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    @Inject("drizzle") private drizzle: NodePgDatabase<typeof schema>,
  ) {}
  async getDataUsers({
    filterBy,
    search,
    orderBy,
    app_origin,
    page = 1,
    perPage = 10,
  }: TUsersPaginationArgs): Promise<TUsersPaginatonResponse> {
    try {
      const [data, total] = await Promise.all([
        this.prisma.users.findMany({
          ...(perPage && { take: Number(perPage ?? 10) }),
          ...(page && { skip: Number(page > 0 ? perPage * (page - 1) : 0) }),
          where: {
            OR: [
              {
                fullname: {
                  contains: search || "",
                  mode: "insensitive",
                },
              },

              {
                email: {
                  contains: search || "",
                  mode: "insensitive",
                },
              },
            ],
            ...(app_origin == EAppsOrigin.PMBADMIN && {
              NOT: [
                {
                  role: {
                    name: {
                      contains: "Super",
                      mode: "insensitive",
                    },
                  },
                },
                {
                  role: {
                    name: "Mahasiswa",
                  },
                },
              ],
            }),
          },
          select: {
            id: true,
            fullname: true,
            email: true,
            createdAt: true,
            avatar: true,
            isVerified: true,
            students: {
              select: {
                phone_number: true,
                pmb: {
                  select: {
                    id: true,
                    registration_status: true,
                  },
                },
              },
            },
            role: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            [filterBy]: orderBy,
          },
        }),
        this.prisma.users.count({
          where: {
            OR: [
              {
                fullname: {
                  contains: search || "",
                  mode: "insensitive",
                },
              },

              {
                email: {
                  contains: search || "",
                  mode: "insensitive",
                },
              },
            ],
            ...(app_origin == EAppsOrigin.PMBADMIN && {
              NOT: [
                {
                  role: {
                    name: {
                      contains: "Super",
                      mode: "insensitive",
                    },
                  },
                },
                {
                  role: {
                    name: "Mahasiswa",
                  },
                },
              ],
            }),
          },
        }),
      ]);

      const lastPage = Math.ceil(total / perPage);
      const mapData = data?.map((el) => ({
        id: el.id,
        fullname: el.fullname,
        email: el.email,
        createdAt: el.createdAt,
        avatar: el.avatar,
        isVerified: el.isVerified,
        role: el.role,
        phone_number: el.students?.phone_number,
        registration_status: el.students?.pmb?.registration_status,
      }));
      return {
        data: mapData,
        meta: {
          total,
          lastPage,
          currentPage: Number(page),
          perPage: Number(perPage),
          prev: page > 1 ? Number(page) - 1 : null,
          next: page < lastPage ? Number(page) + 1 : null,
        },
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async createUser(payload: TCreateUserRequest) {
    try {
      const [isEmailExist, isPhoneNumberExist, roles, [lastRegistrationNumber]] = await Promise.all(
        [
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
              name: schema.roles.name,
            })
            .from(schema.roles)
            .where(eq(schema.roles.id, String(payload.role_id)))
            .limit(1),
          this.drizzle
            .select({
              registrationNumber: schema.admission.registrationNumber,
            })
            .from(schema.admission)
            .orderBy(desc(schema.admission.registrationNumber)),
        ],
      );

      if (isEmailExist.length || isPhoneNumberExist.length) {
        throw new ConflictException("Email atau nomor telepon sudah terdaftar");
      }

      if (!roles.length) {
        throw new NotFoundException("Role tidak ditemukan");
      }

      const [password, { token, expiredAt }, registrationNumber] = await Promise.all([
        encryptPassword(payload.password),
        generateOtp(),
        (roles[0]?.name?.toLowerCase() === "mahasiswa baru" ||
          roles[0]?.name?.toLowerCase() === "mahasiswa") &&
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
          roleId: String(payload.role_id),
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
        (roles[0]?.name?.toLowerCase() === "mahasiswa baru" ||
          roles[0]?.name?.toLowerCase() === "mahasiswa") &&
          this.drizzle
            .insert(schema.students)
            .values({
              phoneNumber: `62${payload.phone_number}`,
              userId: insertUser.id,
            })
            .returning({ id: schema.students.id }),
        roles[0]?.name?.toLowerCase() === "mahasiswa baru" &&
          this.drizzle
            .select({ id: schema.registrationStatus.id })
            .from(schema.registrationStatus)
            .where(ilike(schema.registrationStatus.name, "%Belum Mendaftar%"))
            .limit(1),
      ]);

      const [insertAdmission] =
        (roles[0]?.name?.toLowerCase() === "mahasiswa baru" ||
          roles[0]?.name?.toLowerCase() === "mahasiswa") &&
        (await this.drizzle
          .insert(schema.admission)
          .values({
            registrationNumber,
            registrationStatusId: getRegistrationStatus.id,
            studentId: insertStudent.id,
          })
          .returning({ id: schema.admission.id }));

      const insertStudentGrade =
        (roles[0]?.name?.toLowerCase() === "mahasiswa baru" ||
          roles[0]?.name?.toLowerCase() === "mahasiswa") &&
        (await this.drizzle.insert(schema.studentGrade).values([
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
        ]));

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
        message: "Berhasil membuat akun",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getDatauser(payload: TIdUser) {
    try {
      const { id } = payload;
      const user = await this.drizzle
        .select({
          id: schema.users.id,
          fullname: schema.users.fullname,
          email: schema.users.email,
          avatar: schema.users.avatar,
          isNotificationRead: schema.users.isNotificationRead,
          registrationStatus: schema.registrationStatus.name,
        })
        .from(schema.users)
        .leftJoin(schema.students, eq(schema.students.userId, schema.users.id))
        .leftJoin(schema.admission, eq(schema.admission.studentId, schema.students.id))
        .leftJoin(
          schema.registrationStatus,
          eq(schema.registrationStatus.id, schema.admission.registrationStatusId),
        )
        .where(eq(schema.users.id, id));

      if (!user) {
        throw new NotFoundException("User tidak ditemukan");
      }
      const { registrationStatus, ...rest } = user[0];
      return {
        registration_status: registrationStatus,
        ...rest,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async updateDataUser(payload: IUserRequest): Promise<IUserResponse> {
    try {
      const [user] = await this.drizzle
        .update(schema.users)
        .set({
          email: payload.email,
          fullname: payload.fullname,
          roleId: payload.role_id as string,
          ...(payload.password && { password: await encryptPassword(payload.password) }),
        })
        .where(eq(schema.users.id, payload.id))
        .returning({
          id: schema.users.id,
          refresh_token: schema.users.refreshToken,
          createdAt: schema.users.createdAt,
          avatar: schema.users.avatar,
          isVerified: schema.users.isVerified,
        });

      if (!user) {
        throw new BadRequestException("User tidak ditemukan", {
          cause: new Error(),
        });
      }

      return user;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async deleteDataUser(payload: TIdUser) {
    try {
      const { id } = payload;
      const user = await this.drizzle.delete(schema.users).where(eq(schema.users.id, id));
      if (!user) {
        throw new NotFoundException("User tidak ditemukan");
      }

      return {
        data: user,
        message: `Berhasil delete user`,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getRoles({ search, id }: ISelectRequest): Promise<TRolesResponse> {
    try {
      const roles = await this.drizzle
        .select()
        .from(schema.roles)
        .where(or(ilike(schema.roles.name, `%${search}%`), ilike(schema.roles.id, String(id))));
      if (!roles) {
        throw new NotFoundException("Data tidak ditemukan");
      }
      return roles;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getNotification(payload: { id: string }): Promise<TGetNotificationResponse> {
    try {
      const notificationList = await Promise.all([
        this.drizzle
          .select({
            id: schema.notifications.id,
            title: schema.notifications.title,
            detail: schema.notifications.detail,
            createdAt: schema.notifications.createdAt,
          })
          .from(schema.notifications)
          .where(
            or(eq(schema.notifications.userId, payload.id), eq(schema.notifications.userId, null)),
          ),

        this.drizzle
          .update(schema.users)
          .set({
            isNotificationRead: true,
          })
          .where(eq(schema.users.id, payload.id)),
      ]);

      if (!notificationList) {
        throw new BadRequestException("Gagal mendapatkan pesan");
      }
      return notificationList[0];
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async createNotification(
    payload: TCreateNotificationRequest,
  ): Promise<TCreateNotificationResponse> {
    try {
      const { user_id, title, detail } = payload;

      const createNotification = await Promise.all([
        this.drizzle.insert(schema.notifications).values({
          title,
          detail,
          ...(user_id && { user_id }),
        }),
        !user_id
          ? this.drizzle.update(schema.users).set({
              isNotificationRead: false,
            })
          : this.drizzle
              .update(schema.users)
              .set({
                isNotificationRead: false,
              })
              .where(eq(schema.users.id, user_id)),
      ]);

      if (!createNotification) {
        throw new BadRequestException("Gagal membuat pesan");
      }

      return {
        message: "Berhasil menambahkan pesan",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async deleteNotification(payload: { id: string }) {
    try {
      const deleteNotification = await this.drizzle
        .delete(schema.notifications)
        .where(eq(schema.notifications.id, payload.id));
      if (!deleteNotification) {
        throw new NotFoundException("Gagal menghapus pesan");
      }

      return {
        message: "Berhasil menghapus pesan",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
}
