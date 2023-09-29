import {
  IDegreeProgramRequest,
  IUpdateStudentGradeResponse,
  TCreateScholarshipRequest,
  TDegreeProgramResponse,
  TDepartmentResponse,
  TEducationTypeResponse,
  TFacultyResponse,
  TInterestEducationPrograms,
  TScholarshipResponse,
  TSelectionResponse,
  TStudentsPaginatonResponse,
  TTotalRegistransResponse,
} from "@uninus/entities";
import { api } from "@uninus/web/services";
import { TUploadFileRequest, TUploadFileResponse } from "../user";
import axios from "axios";
import { TUsersPaginationParams } from "./type";

export const RegistransGet = async (): Promise<TTotalRegistransResponse> => {
  const { data } = await api.get<TTotalRegistransResponse>("/registrans");
  return data;
};

export const PopularProgramsGet = async (): Promise<TInterestEducationPrograms> => {
  const { data } = await api.get<TInterestEducationPrograms>("/interest-programs");
  return data;
};
export const uploadFile = async (payload: TUploadFileRequest): Promise<TUploadFileResponse> => {
  const formData = new FormData();
  formData.append("file", payload.file);
  const { data } = await axios.post("https://storage.uninus.ac.id/api/file", formData);
  return data;
};

export const StudentGradeGet = async (): Promise<IUpdateStudentGradeResponse> => {
  const { data } = await api.get<IUpdateStudentGradeResponse>("/student");
  return data;
};

export const allStudentGet = async (
  params: TUsersPaginationParams,
): Promise<TStudentsPaginatonResponse> => {
  const { data } = await api<TStudentsPaginatonResponse>({
    method: "GET",
    params,
    url: "/students-pagination",
  });
  return data;
};
export const facultyGet = async (): Promise<TFacultyResponse> => {
  const { data } = await api.get<TFacultyResponse>("/faculty");
  return data;
};

export const prodiGet = async (): Promise<TDepartmentResponse> => {
  const { data } = await api.get<TDepartmentResponse>("/department");
  return data;
};
export const seleksiGet = async (): Promise<TSelectionResponse> => {
  const { data } = await api.get<TSelectionResponse>("/selection-path");
  return data;
};
export const educationGet = async (): Promise<TEducationTypeResponse> => {
  const { data } = await api.get<TEducationTypeResponse>("/education-type");
  return data;
};

export const beasiswaGet = async (): Promise<TScholarshipResponse> => {
  const { data } = await api.get<TScholarshipResponse>("/scholarship");
  return data;
};
export const createScholarship = async (
  payload: TCreateScholarshipRequest,
): Promise<TScholarshipResponse> => {
  const { data } = await api({
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    url: `/scholarship`,
    data: payload,
  });
  return data;
};
export const DegreeProgramGet = async (): Promise<TDegreeProgramResponse> => {
  const { data } = await api<TDegreeProgramResponse>({
    method: "GET",

    url: "/degree-program",
  });
  return data;
};
