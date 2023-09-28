export type TDataAkun = {
  id: string;
  fullname?: string | null;
  role: { id?: number; name?: string };
  phone_number?: string | null;
  email?: string | null;
  password?: string | null;
};
