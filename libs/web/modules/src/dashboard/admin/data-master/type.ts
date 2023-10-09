import { ReactNode } from "react";

export type TDataMaster = {
  id?: number;
  no?: number | string;
  name: string;
  title: string;
  current_data?: { data: string }[];
  add_data: boolean;
};
export type TAddData = {
  name: string;
  degree_program_id?: string;
  faculty_id?: string;
};
export type TColumnMaster = {
  name: ReactNode;
};

export type TUpdateData = {
  id: number;
  name: string;
  degree_program_id?: number;
  faculty_id?: number;
};
