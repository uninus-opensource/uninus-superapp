"use client";
import { useRecoilState } from "recoil";
import {
  popularPrograms,
  registransData,
  studentState,
  updateState,
  userEmail,
  userState,
} from "./store";
import {
  IGetStudentResponse,
  IGetUserMeResponse,
  TInterestEducationPrograms,
  TTotalRegistransResponse,
} from "@uninus/entities";
import {
  ReturnTypeUpdate,
  ReturnTypeUserEmail,
  ReturnTypesPopularPrograms,
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

export const usePopularPrograms = (): ReturnTypesPopularPrograms => {
  const [get, set] = useRecoilState<TInterestEducationPrograms | undefined>(popularPrograms);
  return {
    setPopularData: (val) => set(val),
    getPopularData: get,
  };
};
export const useUpdate = (): ReturnTypeUpdate => {
  const [get, set] = useRecoilState<boolean>(updateState);
  return {
    setUpdate: (val) => set(val),
    getUpdate: get,
  };
};
