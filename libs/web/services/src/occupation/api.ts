import { api } from "../axios";
import {
  IOccupationRequest,
  TOccupationResponse,
  IOccupationPositionRequest,
  TOccupationPositionResponse,
  ISalaryRequest,
  TSalaryResponse,
} from "@uninus/entities";
export const OccupationGet = async (params: IOccupationRequest): Promise<TOccupationResponse> => {
  const { data } = await api<TOccupationResponse>({
    method: "GET",
    params,
    url: "/occupation",
  });
  return data;
};

export const OccupationPositionGet = async (
  params: IOccupationPositionRequest,
): Promise<TOccupationPositionResponse> => {
  const { data } = await api<TOccupationPositionResponse>({
    method: "GET",
    params,
    url: "/occupation-position",
  });
  return data;
};

export const SalaryGet = async (params: ISalaryRequest): Promise<TSalaryResponse> => {
  const { data } = await api<TSalaryResponse>({
    method: "GET",
    params,
    url: "/salary",
  });
  return data;
};
