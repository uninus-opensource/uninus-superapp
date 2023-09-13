"use client";
import { useRecoilState } from "recoil";
import { registransData, studentState, userEmail, userState } from "./store";
import {
  IGetStudentResponse,
  IGetUserMeResponse,
  TTotalRegistransResponse,
} from "@uninus/entities";
import {
  ReturnTypeUserEmail,
  ReturnTypesRegistransData,
  ReturnTypesStudentData,
  ReturnTypesUserData,
} from "./type";

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

export const useUserEmail = (): ReturnTypeUserEmail => {
  const [get, set] = useRecoilState<string>(userEmail);
  return {
    setEmail: (val) => set(val),
    getEmail: get,
  };
};

export const useRegistransData = (): ReturnTypesRegistransData => {
  const [get, set] = useRecoilState<TTotalRegistransResponse | undefined>(registransData);
  return {
    setRegistransData: (val) => set(val),
    getRegistransData: get,
  };
};
