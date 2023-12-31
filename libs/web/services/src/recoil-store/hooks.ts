"use client";
import { useRecoilState } from "recoil";
import {
  getFaculties,
  dashboardState,
  registransData,
  studentState,
  updateAvatar,
  updateState,
  userEmail,
  userState,
  getStudentbyIdEditData,
  getStudentbyIdValidasiData,
  popularDepartment,
  popularProgram,
  sidebarSiakad,
  notificationSiakad,
  updateFullname,
} from "./store";
import {
  IGetStudentResponse,
  IGetUserMeResponse,
  TFacultyResponse,
  TInterestDepartmentResponse,
  TInterestEducationPrograms,
  TTotalRegistransRes,
} from "@uninus/entities";
import {
  ReturnTypeFaculty,
  ReturnTypeUpdate,
  ReturnTypeUserEmail,
  ReturnTypesDashboardState,
  ReturnTypesNotificationSiakad,
  ReturnTypesPopularDepartment,
  ReturnTypesPopularProgram,
  ReturnTypesRegistransData,
  ReturnTypesSidebarSiakad,
  ReturnTypesStudentData,
  ReturnTypesStudentDataId,
  ReturnTypesUpdateAvatar,
  ReturnTypesUpdateFullname,
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
  const [get, set] = useRecoilState<TTotalRegistransRes | undefined>(registransData);
  return {
    setRegistransData: (val) => set(val),
    getRegistransData: get,
  };
};

export const usePopularPrograms = (): ReturnTypesPopularProgram => {
  const [get, set] = useRecoilState<TInterestEducationPrograms | undefined>(popularProgram);
  return {
    setPopularProgram: (val) => set(val),
    getPopularProgram: get,
  };
};

export const usePopularDepartment = (): ReturnTypesPopularDepartment => {
  const [get, set] = useRecoilState<TInterestDepartmentResponse | undefined>(popularDepartment);
  return {
    setPopularDepartment: (val) => set(val),
    getPopularDepartment: get,
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
  const [get, set] = useRecoilState<IGetStudentResponse | undefined>(getStudentbyIdEditData);
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

export const useStudentDataByIdValidation = (): ReturnTypesStudentDataId => {
  const [get, set] = useRecoilState<IGetStudentResponse | undefined>(getStudentbyIdValidasiData);
  return {
    setStudentbyId: (val) => set(val),
    getStudentbyId: get,
  };
};

export const useSidebarSiakadToogle = (): ReturnTypesSidebarSiakad => {
  const [get, set] = useRecoilState<boolean | undefined>(sidebarSiakad);
  return {
    setSiakadToogle: (val) => set(val),
    getSiakadToogle: get,
  };
};

export const useNotificationSiakadToogle = (): ReturnTypesNotificationSiakad => {
  const [get, set] = useRecoilState<boolean | undefined>(notificationSiakad);
  return {
    setNotifToogle: (val) => set(val),
    getNotifToogle: get,
  };
};

export const useUpdateFullname = (): ReturnTypesUpdateFullname => {
  const [get, set] = useRecoilState<string | null>(updateFullname);
  return {
    setFullname: (val) => set(val),
    getFullname: get,
  };
};
