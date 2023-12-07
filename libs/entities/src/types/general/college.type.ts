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

export interface IGetCurriculumResponse
  extends Array<
    Omit<ICreateCurriculumRequest, "degree_program_id" | "faculty_id" | "department_id"> & {
      degree_program: {
        id: number;
        name: string;
      };
      faculty: {
        id: number;
        name: string;
      };
      department: {
        id: number;
        name: string;
      };
    }
  > {}

export interface ICreateCurriculumRequest {
  name: string;
  degree_program_id: number;
  faculty_id: number;
  department_id: number;
  batch: string;
  release_year: string;
  in_effect: string;
}

export interface ICreateCurriculumResponse {
  message: string;
}

export interface IUpdateCurriculumRequest extends ICreateCurriculumRequest {
  id?: string;
  status?: string;
}

export interface IUpdateCurriculumResponse extends ICreateCurriculumResponse {}

export interface IDeleteCurriculumResponse extends ICreateCurriculumResponse {}
