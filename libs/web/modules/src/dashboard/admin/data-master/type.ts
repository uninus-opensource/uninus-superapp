import { ReactNode } from "react";

export type TDataMaster = {
  no?: number | string;
  name: string;
  title: string;
  current_data?: { data: string }[];
  add_data: boolean;
};

export type TColumnMaster = {
  name: ReactNode;
};
