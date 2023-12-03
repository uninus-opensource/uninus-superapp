import { ISelectRequest, ISelectResponse } from "../index";

export interface IDegreeProgramRequest extends ISelectRequest {}

export interface IDegreeProgramResponse extends ISelectResponse {}

export interface IGetFacultyRequest extends ISelectRequest {
  degree_program_id?: number;
}

export interface IGetFacultyResponse extends ISelectResponse {}
export interface ICreateFacultyRequest extends IGetFacultyRequest {
  name?: string;
}
export interface ICreateFacultyResponse {
  message?: string;
}

export interface IDeleteFacultyRequest {
  id?: number;
}

export interface IUpdateFacultyRequest
  extends IGetFacultyRequest,
    ICreateFacultyRequest,
    IDeleteFacultyRequest {}

export interface IUpdateFacultyResponse extends ICreateFacultyResponse {}

export interface IDeleteFacultyResponse extends ICreateFacultyResponse {}

export interface IGetDepartmentRequest extends IGetFacultyRequest {
  faculty_id: number;
}

export interface IGetDepartmentResponse extends ISelectResponse {}

export interface ICreateDepartmentRequest
  extends ICreateFacultyRequest,
    IGetDepartmentRequest,
    IDeleteFacultyRequest {}

export interface ICreateDepartmentResponse extends ICreateFacultyResponse {}

export interface IUpdateDepartmentRequest extends ICreateDepartmentRequest {}

export interface IUpdateDepartmentResponse extends ICreateFacultyResponse {}

export interface IDeleteDepartmentRequest extends IDeleteFacultyRequest {}

export interface IDeleteDepartmentResponse extends ICreateFacultyResponse {}
