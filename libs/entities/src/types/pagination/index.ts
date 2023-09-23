export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}

export type PaginateOptions = {
  page?: number | string;
  perPage?: number | string;
};

export type PaginateFunction = <T, K>(
  model: unknown,
  args?: K,
  options?: PaginateOptions,
) => Promise<PaginatedResult<T>>;

export type TPaginationArgs = {
  where?: any;
  orderBy?: any;
  page?: number;
  perPage?: number;
};
