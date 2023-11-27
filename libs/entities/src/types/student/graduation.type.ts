export type TGraduationStatusRequest = {
  registration_number: string;
};
export type TGraduationStatusReponse = {
  registration_number?: string | null;
  fullname?: string | null;
  department?: string | null;
  selection_path?: string | null;
  registration_status?: string | null;
  message?: string;
};
