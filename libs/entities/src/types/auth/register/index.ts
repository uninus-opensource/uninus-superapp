export type TRegisterResponse = {
  fullname?: string | null;
  message?: string | null;
  otp?: string | null;
};

export type TRegisterRequest = {
  fullname: string;
  email: string;
  password: string;
  phone_number: string;
  role_id?: number;
  registration_number?: string;
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
