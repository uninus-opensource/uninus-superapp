export interface TUserEmail {
  email: string;
}

export interface TUserEmailResponse extends TUserEmail {
  id: string;
  fullname: string;
}
