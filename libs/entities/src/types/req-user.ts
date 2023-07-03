export type TProfileRequest = {
  nik: string;
  email: string;
};

export type TProfileResponse = {
  id: string;
  nik: string;
  email: string;
  fullname: string;
  password?: string;
  refresh_token?: string | null;
  role_id?: number | null;
  createdAt?: Date;
  avatar: string | null;
};
