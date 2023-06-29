export type TRegisterResponse = {
  id: string;
  nik: string;
  email: string;
  fullname: string | null;
  password: string;
  refresh_token: string | null;
  role_id?: number | null;
  createdAt: Date;
  message: string;
};

export type TRegisterRequest = {
  nik: string;
  fullname: string;
  email: string;
  password: string;
};
