export type TRegisterResponse = {
  message: string;
};

export type TRegisterRequest = {
  nik: string;
  fullname: string;
  email: string;
  password: string;
};

export type TLResponse = {
  message: string;
  token: {
    access_token: string;
    refresh_token: string;
  };
  User: {
    id: string;
    email: string;
    fullname: string | null;
    password: string;
  };
};
