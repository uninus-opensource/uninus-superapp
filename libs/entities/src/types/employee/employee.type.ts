export type TTotalEmployeesResponse = {
  total_employees?: number;
  total_lecturer?: number;
  total_academic_staff?: number;
  total_reguler_employee?: number;
  total_temporary_employee?: number;
  total_fondation_lecturer?: number;
  total_dpk_lecturer?: number;
  total_temporary_lecturer?: number;
  total_reguler_academic_staff?: number;
  total_temporary_academic_staff?: number;
  message?: string;
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
  type: number;
  orderBy?: string;
  page?: number;
  perPage?: number;
  filterBy?: string;
  search?: string;
};
