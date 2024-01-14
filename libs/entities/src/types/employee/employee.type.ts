import { EOrderByPagination } from "../../enum";
import { ISelectRequest } from "../..";

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
  employeeCategoriesId: string;
  orderBy?: EOrderByPagination.ASC | EOrderByPagination.DESC;
  page?: number;
  perPage?: number;
  filterBy?: string;
  search?: string;
};

export type TGetEmployeePositionRequest = ISelectRequest & {
  employeeCategoryId?: string;
};
