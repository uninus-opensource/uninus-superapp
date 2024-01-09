export type TLecturerResponse = {
  id: string;
  fullname: string;
  nip: string;
  nidn: string;
  nik: string;
  additionTask: string;
  lecturerType: string;
  lecturerPosition: string;
  civilServiceLevel: string;
  gender: string;
  workUnits: Array<object>;
  department: Array<object>;
  faculty: Array<object>;
  documents: Array<object>;
};

export type TEmployeeParamsResponse = Array<{
  id: number;
  name: string;
}>;
