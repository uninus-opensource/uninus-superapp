import { ISelectRequest } from "./pmb.type";

export interface IDegreeProgramRequest {
  search: string;
}

export type TDegreeProgramResponse = {
  degree_program: Array<{
    id: number;
    name: string;
  }>;
};

export type TUpdateDepartmentRequest = {
  id?: number;
  name: string;
  faculty_id?: number;
  degree_program_id?: number;
};

export type TCreateDepartmentRequest = {
  name: string;
  faculty_id: number;
  degree_program_id: number;
};

export interface ISelectDepartmentRequest extends ISelectRequest {
  degree_program_id: string;
  faculty_id: string;
}

export type TDepartmentResponse = {
  department: Array<{
    id: number;
    name: string;
  }>;
};

export type TCreateFacultyRequest = {
  name: string;
  degree_program_id: number;
};

export type TUpdateFacultyRequest = {
  id?: number;
  name: string;
  degree_program_id?: number;
};
export type TFacultyResponse = {
  faculty: Array<{
    id: number;
    name: string;
  }>;
};

export interface ISelectFacultyRequest extends ISelectRequest {
  degree_program_id: string;
}
