export type TLecturerResponse = {
  id: number;
  fullname: string;
  nip: string;
  nidn: string;
  nik: string;
  addition_task: string;
  lecturer_category: string;
  lecturer_position: string;
  civil_service_level: string;
  gender: string;
  employee_work_unit: Array<object>;
  lecturer_faculty_department: Array<object>;
  employee_document: Array<object>;
};
