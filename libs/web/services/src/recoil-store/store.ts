"use client";
import {
  IGetStudentResponse,
  IGetUserMeResponse,
  TFacultyResponse,
  TInterestDepartmentResponse,
  TInterestEducationPrograms,
  TTotalRegistransRes,
} from "@uninus/entities";
import { atom } from "recoil";

export const studentState = atom<IGetStudentResponse | undefined>({
  key: "studentState",
  default: undefined,
});

export const userState = atom({
  key: "userState",
  default: [] as unknown as IGetUserMeResponse | undefined,
});

export const userEmail = atom({
  key: "userEmail",
  default: "",
});

export const registransData = atom({
  key: "registransData",
  default: [] as unknown as TTotalRegistransRes | undefined,
});

export const popularProgram = atom({
  key: "popularPrograms",
  default: [] as unknown as TInterestEducationPrograms | undefined,
});

export const popularDepartment = atom({
  key: "popularDepartment",
  default: [] as unknown as TInterestDepartmentResponse | undefined,
});

export const updateState = atom({
  key: "updateState",
  default: false,
});

export const updateAvatar = atom<string | null>({
  key: "updateAvatar",
  default: null,
});

export const getStudentbyIdEditData = atom<IGetStudentResponse | undefined>({
  key: "getStudentbyId",
  default: undefined,
});

export const getFaculties = atom<TFacultyResponse | undefined>({
  key: "getFaculties",
  default: [] as unknown as TFacultyResponse | undefined,
});

export const dashboardState = atom<boolean | undefined>({
  key: "dashboardState",
  default: false,
});

export const getStudentbyIdValidasiData = atom<IGetStudentResponse | undefined>({
  key: "getStudentbyIdValidation",
  default: undefined,
});

export const sidebarSiakad = atom<boolean | undefined>({
  key: "showSiakadSidebar",
  default: false,
});
