export type TTotalEmployeesResponse = {
  totalEmployees?: number;
  totalLecturer?: number;
  totalAcademicStaff?: number;
  totalRegulerEmployee?: number;
  totalTemporaryEmployee?: number;
  totalFondationLecturer?: number;
  totalDpkLecturer?: number;
  totalTemporaryLecturer?: number;
  totalRegulerAcademicStaff?: number;
  totalTemporaryAcademicStaff?: number;
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
