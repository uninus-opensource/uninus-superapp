import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { ISelectRequest } from "./pmb.type";
import * as schema from "@uninus/api/models";

export interface IDegreeProgramRequest {
  search: string;
}

export type TDegreeProgramResponse = {
  degree_program: Array<InferSelectModel<typeof schema.degreeProgram>>;
};

export type TUpdateDepartmentRequest = {
  id?: string;
} & TCreateDepartmentRequest;

export type TCreateDepartmentRequest = Pick<InferInsertModel<typeof schema.department>, "name"> & {
  faculty_id: string;
  degree_program_id: string;
};

export interface ISelectDepartmentRequest extends ISelectRequest {
  degree_program_id: string;
  faculty_id: string;
}

export type TDepartmentResponse = {
  department: Array<
    Omit<InferSelectModel<typeof schema.department>, "degreeProgramId" | "facultyId">
  >;
};

export type TCreateFacultyRequest = {
  name: string;
  degree_program_id: string;
};

export type TUpdateFacultyRequest = {
  id?: string;
  name: string;
  degree_program_id?: string;
};
export type TFacultyResponse = {
  faculty: Array<Omit<InferSelectModel<typeof schema.faculty>, "degreeProgramId">>;
};

export interface ISelectFacultyRequest extends ISelectRequest {
  degree_program_id: string;
}
