export type TAcademicStaffResponse = {
  id: string;
  fullname: string;
  nip: string;
  nik: string;
  gender: string;
  employeeType: string;
  workUnits: Array<object>;
  documents: Array<object>;
};
