export type TAcademicStaffResponse = {
  id: string;
  fullname: string;
  nip: string;
  nik: string;
  gender: string;
  academic_staff_type: string;
  employee_work_unit: Array<object>;
  employee_document: Array<object>;
};
