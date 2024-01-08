import { TVSCreateUser, TVSUpdateUser } from "../../schemas";
import { roles, users } from "@uninus/api/models";
import { InferSelectModel } from "drizzle-orm";
export type TProfileRequest = {
  email: string;
};

export type TIdUser = {
  id: string;
};

export type TProfileResponse = Pick<
  InferSelectModel<typeof users>,
  "id" | "email" | "fullname" | "avatar" | "isVerified"
> & {
  role: string;
};

export type TUser = TProfileResponse & {
  accessToken?: string;
  refreshToken?: string;
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
  role_id?: number | string;
}

export type TCreateUserRequest = TVSCreateUser;

export type TCreateUserResponse = {
  message: string;
};

export type TUpdateUserRequest = TVSUpdateUser;

export type TUpdateUserResponse = TCreateUserRequest;

export interface IUserResponse extends IUser {
  id: string;
  refreshToken: string | null;
  createdAt: Date;
  avatar: string | null;
  isVerified: boolean | null;
}

export type TUsersPaginationArgs = {
  search?: string;
  orderBy?: string;
  page?: number;
  perPage?: number;
  app_origin?: string;
  filterBy?: string;
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

export interface TUserEmail {
  email: string;
}

export interface TUserEmailResponse extends TUserEmail {
  otp?: string;
  id?: string;
  email: string;
  fullname?: string;
}

export type TRolesResponse = Array<InferSelectModel<typeof roles>>;
