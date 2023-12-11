import { TSelectionResponse } from "@uninus/entities";
import { api } from "../axios";

export const SelectionPathGet = async (): Promise<TSelectionResponse> => {
  const { data } = await api<TSelectionResponse>({
    method: "GET",
    url: "/selection-path",
  });
  return data;
};
