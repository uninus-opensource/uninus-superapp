"use client";
import {
  IGetStudentResponse,
  IGetUserMeResponse,
  TFacultyResponse,
  TInterestDepartmentResponse,
  TInterestEducationPrograms,
  TTotalRegistransRes,
} from "@uninus/entities";

export type ReturnTypesStudentData = {
  setStudent: (val: IGetStudentResponse | undefined) => void;
  getStudent: IGetStudentResponse | undefined;
};

export type ReturnTypesUserData = {
  setUser: (val: IGetUserMeResponse | undefined) => void;
  getUser: IGetUserMeResponse | undefined;
};

export type ReturnTypeUserEmail = {
  setEmail: (val: string) => void;
  getEmail: string;
};

export type ReturnTypesRegistransData = {
  setRegistransData: (val: TTotalRegistransRes | undefined) => void;
  getRegistransData: TTotalRegistransRes | undefined;
};

export type ReturnLoadingAvatar = {
  setLoadingAvatar: (val: boolean) => void;
  getLoadingAvatar: boolean;
};

export type ReturnTypesPopularProgram = {
  setPopularProgram: (val: TInterestEducationPrograms | undefined) => void;
  getPopularProgram: TInterestEducationPrograms | undefined;
};

export type ReturnTypesPopularDepartment = {
  setPopularDepartment: (val: TInterestDepartmentResponse | undefined) => void;
  getPopularDepartment: TInterestDepartmentResponse | undefined;
};

export type ReturnTypeUpdate = {
  setUpdate: (val: boolean) => void;
  getUpdate: boolean;
};

export type ReturnTypesUpdateAvatar = {
  setUpdateAvatar: (val: string | null) => void;
  getUpdateAvatar: string | null;
};

export type ReturnTypesStudentDataId = {
  setStudentbyId: (val: IGetStudentResponse | undefined) => void;
  getStudentbyId: IGetStudentResponse | undefined;
};

export type ReturnTypeFaculty = {
  setFaculties: (val: TFacultyResponse | undefined) => void;
  getFaculties: TFacultyResponse | undefined;
};

export type ReturnTypesDashboardState = {
  setDashboardControlState: (val: boolean | undefined) => void;
  getDashboardControlState: boolean | undefined;
};

export type ReturnTypesSidebarSiakad = {
  setSiakadToogle: (val: boolean | undefined) => void;
  getSiakadToogle: boolean | undefined;
};

export type ReturnTypesNotificationSiakad = {
  setNotifToogle: (val: boolean | undefined) => void;
  getNotifToogle: boolean | undefined;
};

export type ReturnTypesUpdateFullname = {
  setFullname: (val: string | null) => void;
  getFullname: string | null;
};
