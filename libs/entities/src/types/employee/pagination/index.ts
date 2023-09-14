import { Prisma } from "@prisma/client";

export type TEmployePagination = {
  where?: Prisma.UsersWhereInput;
  orderBy?: Prisma.UsersOrderByWithRelationInput;
  page?: number;
  perPage?: number;
  type: string;
};

export type TEmployeesResponse = {
  data: Array<{
    fullname?: string | null;
    nip?: string | null;
    nidn?: string | null;
    birth_date?: string | null;
    faculty?: string | null;
    department?: string | null;
    education?: string | null;
    work_unit?: string | null;
    employee_status?: string | null;
  }>;
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev?: null | number;
    next?: null | number;
  };
};

export type TEmployeePaginationArgs = {
  type?: number;
  where?: Prisma.UsersWhereInput;
  orderBy?: Prisma.UsersOrderByWithRelationInput;
  page?: number;
  perPage?: number;
};
