export type TRegisterResponse = {
  id: string;
  nik: string;
  email: string;
  fullname: string | null;
  password: string;
  refresh_token: string | null;
  role_id?: 1;
  createdAt: Date;
  photo: string | null;
  message: string;
};


export type TRegisterRequest = {
    nik: string,
    fullname: string,
    email: string,
    password: string,
}