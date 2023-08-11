import { api } from "@uninus/web/services";
import {
  TDegreeProgramResponse,
  IDegreeProgramRequest,
  ISelectDepartmentRequest,
  TDepartmentResponse,
  ISelectionRequest,
  TSelectionResponse,
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
    url: "/selection-path",
  });
  return data;
};
