import { api } from "../axios";
import {
  IParentStatusRequest,
  TParentStatusResponse,
  IParentEducationRequest,
  TParentEducationResponse,
} from "@uninus/entities";

export const ParentStatusGet = async (
  params: IParentStatusRequest,
): Promise<TParentStatusResponse> => {
  const { data } = await api<TParentStatusResponse>({
    method: "GET",
    params,
    url: "/parent/status",
  });
  return data;
};

export const ParentEducationGet = async (
  params: IParentEducationRequest,
): Promise<TParentEducationResponse> => {
  const { data } = await api<TParentEducationResponse>({
    method: "GET",
    params,
    url: "/parent/education",
  });
  return data;
};
