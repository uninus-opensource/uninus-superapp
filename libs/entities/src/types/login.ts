export type TLoginResponse = {
  id: string;
  user: {
    id: string;
    nik: string;
    email: string;
    fullname: string;
    role: string | null;
    createdAt: Date;
    avatar: string | null;
    isVerified: boolean | null;
  };
  token: {
    access_token: string;
    refresh_token: string;
  };
  message: string;
};

export type TLoginRequest = {
  email?: string;
  password?: string;
};

export type TLoginAuth = {
  user: {
    nik: string;
    email: string;
  };
};
