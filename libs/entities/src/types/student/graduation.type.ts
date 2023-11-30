import { TVSGraduationStatus } from "../../schemas";

export type TGraduationStatusRequest = TVSGraduationStatus;
export type TGraduationStatusReponse = {
  registration_number?: string | null;
  fullname?: string | null;
  department?: string | null;
  selection_path?: string | null;
  registration_status?: string | null;
  message?: string;
};
