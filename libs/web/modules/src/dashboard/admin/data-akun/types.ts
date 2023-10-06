export type TDataAkun = {
  id: string;
  fullname: string;
  role: { id: number; name: string };
  email: string;
  phone_number: string;
  password: string;
};
export type TUserRoles = Array<{
  id?: number | null;
  name?: string | null;
}>;

export type TUpdateDataAkun = {
  id: string;
  fullname?: string | null;
  role_id?: number | null;
  email?: string | null;
  phone_number?: string | null;
  password?: string | null;
};
