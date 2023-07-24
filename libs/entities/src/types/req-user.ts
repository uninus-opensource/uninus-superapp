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
