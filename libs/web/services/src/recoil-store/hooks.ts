"use client";
import { useRecoilState } from "recoil";
import {
  getFaculties,
  dashboardState,
  getStudentbyId,
  popularPrograms,
  registransData,
  studentState,
  updateAvatar,
  updateState,
  userEmail,
  userState,
} from "./store";
import {
  IGetStudentResponse,
  IGetUserMeResponse,
  TFacultyResponse,
  TInterestEducationPrograms,
  TTotalRegistransResponse,
} from "@uninus/entities";
import {
  ReturnTypeFaculty,
  ReturnTypeUpdate,
  ReturnTypeUserEmail,
  ReturnTypesDashboardState,
  ReturnTypesPopularPrograms,
  ReturnTypesRegistransData,
  ReturnTypesStudentData,
  ReturnTypesStudentDataId,
  ReturnTypesUpdateAvatar,
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

export const useUpdateAvatar = (): ReturnTypesUpdateAvatar => {
  const [get, set] = useRecoilState<string | null>(updateAvatar);
  return {
    setUpdateAvatar: (val) => set(val),
    getUpdateAvatar: get,
  };
};

export const useStudentDataById = (): ReturnTypesStudentDataId => {
  const [get, set] = useRecoilState<IGetStudentResponse | undefined>(getStudentbyId);
  return {
    setStudentbyId: (val) => set(val),
    getStudentbyId: get,
  };
};

export const useFaculty = (): ReturnTypeFaculty => {
  const [get, set] = useRecoilState<TFacultyResponse | undefined>(getFaculties);
  return {
    setFaculties: (val) => set(val),
    getFaculties: get,
  };
};
export const useDashboardStateControl = (): ReturnTypesDashboardState => {
  const [get, set] = useRecoilState<boolean | undefined>(dashboardState);
  return {
    setDashboardControlState: (val) => set(val),
    getDashboardControlState: get,
  };
};
