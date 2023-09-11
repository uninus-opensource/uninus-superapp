import { Prisma } from "@prisma/client";

export type TEmployePagination = {
  where?: Prisma.UsersWhereInput;
  orderBy?: Prisma.UsersOrderByWithRelationInput;
  page?: number;
  perPage?: number;
  type: string;
};

export type TEmployeesResponse = {
  id: number;
  nip: string;
  nidn: string;
  birth_date: string;
  faculty: { name: string };
  department: { name: string };
  education: { name: string };
  academin_position: { name: string };
  position: { name: string };
  work_unit: { name: string };
};
