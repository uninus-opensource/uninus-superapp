import { TVSGraduationStatus } from "../../schemas";

export type TGraduationStatusRequest = TVSGraduationStatus;
export type TGraduationStatusReponse = {
  registrationNumber?: string | null;
  fullname?: string | null;
  department?: string | null;
  selectionPath?: string | null;
  registrationStatus?: string | null;
  message?: string;
};
