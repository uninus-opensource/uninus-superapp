export type TLoginResponse = {
  id: string;
  user: {
    id: string;
    email: string;
    fullname: string;
    role: string | null;
    createdAt: Date;
    avatar: string | null;
    isVerified: boolean | null;
  };
  token: {
    access_token: string;
    exp: number;
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
    email: string;
  };
};
