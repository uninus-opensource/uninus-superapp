export type TUser = {
  id: string;
  email: string;
  fullname: string;
  role: string | null;
  createdAt: Date;
  avatar: string | null;
  isVerified: boolean | null;
  access_token?: string;
  refresh_token?: string;
  exp?: string;
};

export interface IUser {
  email: string;
  fullname: string;
  password: string;
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