import * as schema from "@uninus/api/models";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export type TTotalRegistransResponse = {
  total_registrans: number;
  total_interest: number;
  paids_ukt: number;
  paids_form: number;
  accepted_registrans: number;
};

export type TTotalRegistransRes = {
  data: Array<{
    label: string;
    total_interest: number;
    total_registrans: number;
    paids_form: number;
    accepted_registrans: number;
    paids_ukt: number;
  }>;
  summary: {
    total_registrans: number;
    total_interest: number;
    paids_form: number;
    accepted_registrans: number;
    paids_ukt: number;
  };
};

export interface IRegistransRequest {
  filter_type?: string;
  start_date?: string;
  end_date?: string;
}

export type TInterestEducationPrograms = {
  data: Array<{
    name: string;
    total: number;
  }>;
};

export interface IInterestEducationPrograms {
  filter_type?: string;
}

export type TInterestDepartmentResponse = {
  kpi?: number;
  pai?: number;
  pgmi?: number;
  pbs?: number;
  akuntansi?: number;
  manajemen?: number;
  iHukum?: number;
  iKomunikasi?: number;
  iPerpustakaan?: number;
  pba?: number;
  pbsi?: number;
  pbing?: number;
  pgpaud?: number;
  plb?: number;
  pls?: number;
  pmath?: number;
  ppkn?: number;
  agrotek?: number;
  te?: number;
  tif?: number;
  ti?: number;
  mAdmPendidikan?: number;
  mPai?: number;
  mIHukum?: number;
  dIPendidikan?: number;
};

export interface IInterestDepartment {
  filter_type?: string;
  degree_program_id?: string;
}

export type TRegistrationStatusResponse = {
  registration_status: Array<InferSelectModel<typeof schema.registrationStatus>>;
};

export type TQuestionResponse = Array<TUpdateQuestionRequest>;
export type TCreateQuestionRequest = Omit<TUpdateQuestionRequest, "id">;
export type TUpdateQuestionRequest = Pick<
  InferSelectModel<typeof schema.admissionTest>,
  "question"
> & {
  id?: string;
  correct_answer: string;
  answers: { [key: string]: string };
};

export type TDeleteQuestionResponse = {
  message: string;
};

export interface ISelectRequest {
  search?: string;
  id?: number;
}

export interface ISelectionRequest extends ISelectRequest {
  degree_program_id: string;
}

export type TSelectionResponse = {
  selection: Array<Pick<InferSelectModel<typeof schema.selectionPath>, "id" | "name">>;
};

export type TRegistrationPathResponse = {
  registration_path: Array<Pick<InferSelectModel<typeof schema.registrationPath>, "id" | "name">>;
};

export type TGeneralResponse = {
  message: string;
};

export interface IScholarshipRequest {
  search: string;
}

export type TScholarshipResponse = {
  scholarship: Array<Pick<InferSelectModel<typeof schema.scholarship>, "id" | "name">>;
};

export type TCreateScholarshipRequest = Pick<
  InferSelectModel<typeof schema.scholarship>,
  "name" | "discount"
>;

export type TUpdateScholarshipRequest = Pick<
  InferSelectModel<typeof schema.scholarship>,
  "name"
> & {
  id?: string;
};
export type TUpdateSelectionPathRequest = {
  id?: string;
} & TCreateSelectionPathRequest;

export type TCreateSelectionPathRequest = Pick<
  InferInsertModel<typeof schema.selectionPath>,
  "name"
> & {
  degree_program_id: string;
};
