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
  orderBy?: string;
  page?: number;
  perPage?: number;
  filterBy?: string;
  search?: string;
};
