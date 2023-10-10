import {
  ISelectFacultyRequest,
  TCreateDepartmentRequest,
  TCreateEducationRequest,
  TCreateFacultyRequest,
  TCreateScholarshipRequest,
  TCreateSelectionPathRequest,
  TDegreeProgramResponse,
  TDepartmentResponse,
  TEducationHistoryResponse,
  TEducationTypeResponse,
  TFacultyResponse,
  TScholarshipResponse,
  TSelectionResponse,
  TUpdateDepartmentRequest,
  TUpdateFacultyRequest,
  TUpdateScholarshipRequest,
  TUpdateSelectionPathRequest,
} from "@uninus/entities";
import { api } from "@uninus/web/services";

export const facultyGet = async (params: ISelectFacultyRequest): Promise<TFacultyResponse> => {
  const { data } = await api<TFacultyResponse>({
    method: "GET",
    params,
    url: "/faculty",
  });
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

export const createDepartment = async (
  payload: TCreateDepartmentRequest,
): Promise<TDepartmentResponse> => {
  const { data } = await api({
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    url: `/department`,
    data: payload,
  });
  return data;
};
export const createFaculty = async (payload: TCreateFacultyRequest): Promise<TFacultyResponse> => {
  const { data } = await api({
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    url: `/faculty`,
    data: payload,
  });
  return data;
};

export const createSchool = async (
  payload: TCreateEducationRequest,
): Promise<TEducationHistoryResponse> => {
  const { data } = await api({
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    url: `/education`,
    data: payload,
  });
  return data;
};

export const createSelection = async (
  payload: TCreateSelectionPathRequest,
): Promise<TSelectionResponse> => {
  const { data } = await api({
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    url: `/selection-path`,
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
export const deleteFaculty = async (id: number): Promise<TFacultyResponse> => {
  const { data } = await api({
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    url: `/faculty/${id}`,
  });
  return data;
};
export const deleteScholarship = async (id: number): Promise<TScholarshipResponse> => {
  const { data } = await api({
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    url: `/scholarship/${id}`,
  });
  return data;
};
export const deleteSelectionPath = async (id: number): Promise<TSelectionResponse> => {
  const { data } = await api({
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    url: `/selection/${id}`,
  });
  return data;
};
export const deleteDepartment = async (id: number): Promise<TDepartmentResponse> => {
  const { data } = await api({
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    url: `/department/${id}`,
  });
  return data;
};
export const updateFaculty = async (payload: TUpdateFacultyRequest): Promise<TFacultyResponse> => {
  const { data } = await api({
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    url: `/faculty/${payload.id}`,
    data: payload,
  });
  return data;
};
export const updateScholarship = async (
  payload: TUpdateScholarshipRequest,
): Promise<TScholarshipResponse> => {
  const { data } = await api({
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    url: `/scholarship/${payload.id}`,
    data: payload,
  });
  return data;
};
export const updateDepartment = async (
  payload: TUpdateDepartmentRequest,
): Promise<TDepartmentResponse> => {
  const { data } = await api({
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    url: `/department/${payload.id}`,
    data: payload,
  });
  return data;
};
export const updateSelectionPath = async (
  payload: TUpdateSelectionPathRequest,
): Promise<TSelectionResponse> => {
  const { data } = await api({
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    url: `/selection/${payload.id}`,
    data: payload,
  });
  return data;
};
