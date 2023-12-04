export type TAcademicStaffResponse = {
  id: number;
  fullname: string;
  nip: string;
  nik: string;
  gender: string;
  academic_status: string;
  employee_work_unit: Array<object>;
  employee_document: Array<object>;
};
