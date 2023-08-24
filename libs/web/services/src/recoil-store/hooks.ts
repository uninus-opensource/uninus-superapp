"use client";
import { useRecoilState } from "recoil";
import { studentState, userState } from "./store";
import { IGetStudentResponse, IGetUserMeResponse } from "@uninus/entities";
import { ReturnTypesStudentData, ReturnTypesUserData } from "./type";

export const useStudentData = (): ReturnTypesStudentData => {
  const [get, set] = useRecoilState<IGetStudentResponse | undefined>(studentState);
  return {
    setStudent: (val) => set(val),
    getStudent: get,
  };
};

export const useUserData = (): ReturnTypesUserData => {
  const [get, set] = useRecoilState<IGetUserMeResponse | undefined>(userState);
  return {
    setUser: (val) => set(val),
    getUser: get,
  };
};
