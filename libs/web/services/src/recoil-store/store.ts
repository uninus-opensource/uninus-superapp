"use client";
import { IGetStudentResponse, IGetUserMeResponse } from "@uninus/entities";
import { atom } from "recoil";

export const studentState = atom({
  key: "studentState",
  default: [] as unknown as IGetStudentResponse | undefined,
});

export const userState = atom({
  key: "userState",
  default: [] as unknown as IGetUserMeResponse | undefined,
});
