"use client";
import {
  IGetStudentResponse,
  IGetUserMeResponse,
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
