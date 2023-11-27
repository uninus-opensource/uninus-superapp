export interface TUserEmail {
  email: string;
}

export interface TUserEmailResponse extends TUserEmail {
  otp?: string;
  id?: string;
  email: string;
}
