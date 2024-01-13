import * as schema from "@uninus/api/models";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export type TTotalRegistransResponse = {
  totalRegistrans: number;
  totalInterest: number;
  paidsUkt: number;
  paidsForm: number;
  acceptedRegistrans: number;
};

export type TTotalRegistransRes = {
  data: Array<{
    label: string;
    totalInterest: number;
    totalRegistrans: number;
    paidsForm: number;
    acceptedRegistrans: number;
    paidsUkt: number;
  }>;
  summary: {
    totalRegistrans: number;
    totalInterest: number;
    paidsForm: number;
    acceptedRegistrans: number;
    paidsUkt: number;
  };
};

export interface IRegistransRequest {
  filterType?: string;
  startDate?: string;
  endDate?: string;
}

export type TInterestEducationPrograms = {
  data: Array<{
    name: string;
    total: number;
  }>;
};

export interface IInterestEducationPrograms {
  filterType?: string;
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
  filterType?: string;
  degreeProgramId?: string;
}

export type TRegistrationStatusResponse = Array<InferSelectModel<typeof schema.registrationStatus>>;

export type TQuestionResponse = Array<TUpdateQuestionRequest>;
export type TCreateQuestionRequest = Omit<TUpdateQuestionRequest, "id">;
export type TUpdateQuestionRequest = Pick<
  InferSelectModel<typeof schema.admissionTest>,
  "question"
> & {
  id?: string;
  correctAnswer: string;
  answers: { [key: string]: string };
};

export type TDeleteQuestionResponse = {
  message: string;
};

export interface ISelectRequest {
  search?: string;
  id?: string;
}

export interface ISelectionRequest extends ISelectRequest {
  degreeProgramId: string;
}

export type TSelectionResponse = Array<
  Omit<InferSelectModel<typeof schema.selectionPath>, "degreeProgramId">
>;

export type TRegistrationPathResponse = Array<
  Omit<InferSelectModel<typeof schema.registrationPath>, "degreeProgramId">
>;

export type TGeneralResponse = {
  message: string;
};

export interface IScholarshipRequest {
  search: string;
}

export type TScholarshipResponse = Array<InferSelectModel<typeof schema.scholarship>>;

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
  degreeProgramId: string;
};
