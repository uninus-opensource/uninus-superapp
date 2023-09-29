import { Prisma } from "@prisma/client";

export type TProfileRequest = {
  email: string;
};

export type TProfileResponse = {
  id: string;
  email: string;
  fullname: string;
  password?: string;
  refresh_token?: string | null;
  role_id?: number | null;
  createdAt?: Date;
  avatar: string | null;
};

export type TUser = {
  id: string;
  email: string;
  fullname: string;
  role: string;
  createdAt: Date;
  avatar: string | null;
  isVerified: boolean | null;
  access_token?: string;
  refresh_token?: string;
  exp?: string;
};

export interface IUser {
  id: string;
  email?: string;
  fullname?: string;
  password?: string;
  employees?: number | null;
  lecturers?: number | null;
}

export interface IUserRequest extends IUser {
  phone_number?: string | null;
  role_id?: number | null;
}

export interface IUserResponse extends IUser {
  id: string;
  refresh_token: string | null;
  createdAt: Date;
  avatar: string | null;
  isVerified: boolean | null;
}

export type TUsersPaginationArgs = {
  where?: Prisma.UsersWhereInput;
  orderBy?: Prisma.UsersOrderByWithRelationInput;
  page?: number;
  perPage?: number;
};

export type TUsersPaginatonResponse = {
  data: Array<object>;
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev?: null | number;
    next?: null | number;
  };
};
