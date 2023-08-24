"use client";
import { IGetStudentResponse, IGetUserMeResponse } from "@uninus/entities";

export type ReturnTypesStudentData = {
  setStudent: (val: IGetStudentResponse | undefined) => void;
  getStudent: IGetStudentResponse | undefined;
};

export type ReturnTypesUserData = {
  setUser: (val: IGetUserMeResponse | undefined) => void;
  getUser: IGetUserMeResponse | undefined;
};
