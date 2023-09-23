export type TEmployePagination = {
  where?: any;
  orderBy?: any;
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
  where?: any;
  orderBy?: any;
  page?: number;
  perPage?: number;
};
