import { Prisma } from "@prisma/client";

export type TEmployePagination = {
  where?: any;
  orderBy?: any;
  page?: number;
  perPage?: number;
  type: string;
};

export type TEmployeesResponse = {
  data: Array<object>;
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
  where?: Prisma.EmployeesWhereInput;
  orderBy?: Prisma.EmployeesOrderByWithRelationInput;
  page?: number;
  perPage?: number;
};
