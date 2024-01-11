import { api } from "@uninus/web/services";
import {
  TDegreeProgramResponse,
  IDegreeProgramRequest,
  ISelectDepartmentRequest,
  TDepartmentResponse,
  ISelectionRequest,
  TSelectionResponse,
  IStudentData,
  TRegistrationPathResponse,
} from "@uninus/entities";

export const DegreeProgramGet = async (
  params: IDegreeProgramRequest,
): Promise<TDegreeProgramResponse> => {
  const { data } = await api<TDegreeProgramResponse>({
    method: "GET",
    params,
    url: "/degree-program",
  });
  return data;
};

export const DepartmentGet = async (
  params: ISelectDepartmentRequest,
): Promise<TDepartmentResponse> => {
  const { data } = await api<TDepartmentResponse>({
    method: "GET",
    params,
    url: "/department",
  });
  return data;
};

export const SelectionGet = async (params: ISelectionRequest): Promise<TSelectionResponse> => {
  const { data } = await api<TSelectionResponse>({
    method: "GET",
    params,
    url: "/path/selection",
  });
  return data;
};

export const StudentUpdate = async (payload: IStudentData): Promise<IStudentData> => {
  const { data } = await api.patch<IStudentData>("/student", payload);
  return data;
};

export const RegistrationsPath = async (): Promise<TRegistrationPathResponse> => {
  const { data } = await api<TRegistrationPathResponse>({
    method: "GET",
    url: "/path/registration",
  });

  return data;
};
