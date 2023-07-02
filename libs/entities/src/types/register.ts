export type TRegisterResponse = {
  message: string;
};


export type TRegisterRequest = {
    nik: string,
    fullname: string,
    email: string,
    password: string,
}

export type TRequestAuth = {
  user: {
    nik: string;
    email: string;
  }
}