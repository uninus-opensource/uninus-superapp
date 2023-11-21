import { api } from "@uninus/web/services";
import {
  IUpdateStudentResponse,
  IGetStudentResponse,
  IGetUserMeResponse,
  IUpdateStudentGradeRequest,
  IUpdateStudentGradeResponse,
  IUpdateStudentRequest,
  TStatusPaymentRequest,
  TStatusPaymentResponse,
} from "@uninus/entities";
import { TUploadFileRequest, TUploadFileResponse } from "./type";
import axios from "axios";

export const BiodataUpdate = async (
  payload: IUpdateStudentRequest,
): Promise<IUpdateStudentResponse> => {
  const { data } = await api.patch<IUpdateStudentRequest>("/student", payload);
  return data;
};

export const BiodatatGet = async (): Promise<IGetStudentResponse> => {
  const { data } = await api.get<IGetStudentResponse>("/student");
  return data;
};

export const StudentGet = async (): Promise<IGetUserMeResponse> => {
  const { data } = await api.get<IGetUserMeResponse>("/user/me");
  return data;
};

export const UpdateAverage = async (
  payload: IUpdateStudentGradeRequest,
): Promise<IUpdateStudentGradeResponse> => {
  const { data } = await api.patch<IUpdateStudentGradeRequest>("/student", payload);
  return data;
};
export const StudentGradeGet = async (): Promise<IUpdateStudentGradeResponse> => {
  const { data } = await api.get<IUpdateStudentGradeResponse>("/student");
  return data;
};

export const uploadFile = async (payload: TUploadFileRequest): Promise<TUploadFileResponse> => {
  const formData = new FormData();
  formData.append("file", payload.file);
  const { data } = await axios.post("https://storage.uninus.ac.id/api/file", formData);
  return data;
};

export const checkPayment = async (
  payload: TStatusPaymentRequest,
): Promise<TStatusPaymentResponse> => {
  const { data } = await api.post("/finance/status-payment", payload);
  return data;
};
