import { api } from "@uninus/web/services";
import {
  TYearGraduationResponse,
  IYearGraduationRequest,
  IEducationTypeRequest,
  TEducationTypeResponse,
  TEducationHistoryResponse,
  ISelectEducationHistoryRequest,
  IEducationMajorRequest,
  TEducationMajorResponse,
} from "@uninus/entities";

export const YearGraduationGet = async (
  params: IYearGraduationRequest,
): Promise<TYearGraduationResponse> => {
  const { data } = await api<TYearGraduationResponse>({
    method: "GET",
    params,
    url: "/year-graduate",
  });
  return data;
};

export const educationTypeGet = async (
  params: IEducationTypeRequest,
): Promise<TEducationTypeResponse> => {
  const { data } = await api<TEducationTypeResponse>({
    method: "GET",
    params,
    url: "/education-type",
  });
  return data;
};

export const educationHistoryGet = async (
  params: ISelectEducationHistoryRequest,
): Promise<TEducationHistoryResponse> => {
  const { data } = await api<TEducationHistoryResponse>({
    method: "GET",
    params,
    url: "/education",
  });
  return data;
};

export const educationMajorGet = async (
  params: IEducationMajorRequest,
): Promise<TEducationMajorResponse> => {
  const { data } = await api<TEducationMajorResponse>({
    method: "GET",
    params,
    url: "/education-major",
  });
  return data;
};
