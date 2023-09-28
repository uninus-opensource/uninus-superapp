import {
  IUpdateStudentGradeResponse,
  TInterestEducationPrograms,
  TTotalRegistransResponse,
} from "@uninus/entities";
import { api } from "@uninus/web/services";
import { TUploadFileRequest, TUploadFileResponse } from "../user";
import axios from "axios";

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
