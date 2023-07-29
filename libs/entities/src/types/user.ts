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
