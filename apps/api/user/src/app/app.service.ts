import {
  BadRequestException,
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import {
  EAppsOrigin,
  ISelectRequest,
  IUserRequest,
  IUserResponse,
  TCreateUserRequest,
  TIdUser,
  TRolesResponse,
  TUsersPaginationArgs,
  TUsersPaginatonResponse,
} from "@uninus/entities";
import { PrismaService } from "@uninus/api/services";
import { encryptPassword, errorMappings } from "@uninus/api/utilities";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
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
      const isEmailExist = await this.prisma.users.findUnique({
        where: {
          email: payload.email,
        },
      });
      if (isEmailExist) {
        throw new ConflictException("Email sudah digunakan");
      }
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
      const user = await this.prisma.users.create({
        data: {
          fullname: payload.fullname,
          email: payload.email.toLowerCase(),
          password: await encryptPassword(payload.password),
          role_id: payload.role_id,
          avatar: "https://uninus-demo.s3.ap-southeast-1.amazonaws.com/avatar-default.png",
          ...(payload.role_id == 1 && {
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
          }),
        },
      });
      return {
        data: user,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getDatauser(payload: TIdUser) {
    try {
      const { id } = payload;
      const user = await this.prisma.users.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          fullname: true,
          email: true,
          avatar: true,
          students: {
            select: {
              pmb: {
                select: {
                  registration_status: true,
                },
              },
            },
          },
        },
      });
      if (!user) {
        throw new NotFoundException("User tidak ditemukan");
      }
      const { students, ...dataUser } = user;
      return {
        registration_status: students?.pmb?.registration_status?.name,
        ...dataUser,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async updateDataUser(payload: IUserRequest): Promise<IUserResponse> {
    try {
      const user = await this.prisma.users.update({
        where: {
          id: payload.id,
        },
        data: {
          email: payload.email,
          fullname: payload.fullname,
          role_id: payload.role_id,
          ...(payload.password && { password: await encryptPassword(payload.password) }),
        },
      });
      if (!user) {
        throw new BadRequestException("User tidak ditemukan", {
          cause: new Error(),
        });
      }

      return {
        ...user,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async deleteDataUser(payload: TIdUser) {
    try {
      const { id } = payload;
      const user = await this.prisma.users.delete({
        where: {
          id,
        },
        select: {
          id: true,
          fullname: true,
          email: true,
        },
      });
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
      const roles = await this.prisma.roles.findMany({
        where: {
          id: id && Number(id),
          name: {
            ...(search && { contains: search }),
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          name: true,
        },
      });
      if (!roles) {
        throw new NotFoundException("Data tidak ditemukan");
      }
      return roles;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
}
