import { ReactNode } from "react";

export type TDataMaster = {
  no?: number | string;
  name: string;
  current_data?: { data: string }[];
};

export type TColumnMaster = {
  name: ReactNode;
};
