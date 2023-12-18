export type TLecturerResponse = {
  id: string;
  fullname: string;
  nip: string;
  nidn: string;
  nik: string;
  addition_task: string;
  lecturer_type: string;
  lecturer_position: string;
  civil_service_level: string;
  gender: string;
  employee_work_unit: Array<object>;
  lecturer_faculty_department: Array<object>;
  employee_document: Array<object>;
};

export type TEmployeeParamsResponse = Array<{
  id: number;
  name: string;
}>;
