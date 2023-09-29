"use client";
import {
  IGetStudentResponse,
  IGetUserMeResponse,
  TFacultyResponse,
  TInterestEducationPrograms,
  TTotalRegistransResponse,
} from "@uninus/entities";
import { atom } from "recoil";

export const studentState = atom({
  key: "studentState",
  default: [] as unknown as IGetStudentResponse | undefined,
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
  default: [] as unknown as TTotalRegistransResponse | undefined,
});

export const popularPrograms = atom({
  key: "popularPrograms",
  default: [] as unknown as TInterestEducationPrograms | undefined,
});

export const updateState = atom({
  key: "updateState",
  default: false,
});

export const updateAvatar = atom<string | null>({
  key: "updateAvatar",
  default: null,
});

export const getStudentbyId = atom<IGetStudentResponse | undefined>({
  key: "getStudentbyId",
  default: undefined,
});
export const getFaculties = atom<TFacultyResponse | undefined>({
  key: "getFaculties",
  default: [] as unknown as TFacultyResponse | undefined,
});
