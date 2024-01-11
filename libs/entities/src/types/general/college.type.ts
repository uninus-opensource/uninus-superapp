import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { ISelectRequest } from "./pmb.type";
import * as schema from "@uninus/api/models";

export interface IDegreeProgramRequest {
  search: string;
}

export type TDegreeProgramResponse = Array<InferSelectModel<typeof schema.degreeProgram>>;

export type TUpdateDepartmentRequest = {
  id?: string;
} & TCreateDepartmentRequest;

export type TCreateDepartmentRequest = InferInsertModel<typeof schema.department>;

export interface ISelectDepartmentRequest extends ISelectRequest {
  degreeProgramId: string;
  facultyId: string;
}

export type TDepartmentResponse = Array<
  Omit<InferSelectModel<typeof schema.department>, "degreeProgramId" | "facultyId">
>;

export type TCreateFacultyRequest = {
  name: string;
  degreeProgramId: string;
};

export type TUpdateFacultyRequest = {
  id?: string;
  name: string;
  degreeProgramId?: string;
};
export type TFacultyResponse = Array<
  Omit<InferSelectModel<typeof schema.faculty>, "degreeProgramId">
>;

export interface ISelectFacultyRequest extends ISelectRequest {
  degreeProgramId: string;
}
