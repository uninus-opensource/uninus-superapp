export interface ISelectRequest {
  search: string;
}

export interface IProvinceRequest {
  search: string;
}

export interface ISelectFacultyRequest extends ISelectRequest {
  degree_program_id: string;
}

export interface ISelectDepartmentRequest extends ISelectRequest {
  faculty_id: string;
}

export type TProvinceResponse = {
  province: Array<{
    id: number;
    name: string;
  }>;
};

export interface ICityRequest extends ISelectRequest {
  province_id: string;
}

export type TCityResponse = {
  city: Array<{
    id: number;
    name: string;
  }>;
};

export interface ISubDistrictRequest extends ISelectRequest {
  city_id: string;
}

export type TSubDistrictResponse = {
  sub_district: Array<{
    id: number;
    name: string;
  }>;
};

export type TDegreeProgramResponse = {
  degree_program: Array<{
    id: number;
    name: string;
  }>;
};

export type TFacultyResponse = {
  faculty: Array<{
    id: number;
    name: string;
  }>;
};

export type TDepartmentResponse = {
  department: Array<{
    id: number;
    name: string;
  }>;
};

export type TReligionResponse = {
  religion: Array<{
    id: number;
    name: string;
  }>;
};

export type TMaritalStatusResponse = {
  maritalStatus: Array<{
    id: number;
    name: string;
  }>;
};

export type TGenderResponse = {
  gender: Array<{
    id: number;
    name: string;
  }>;
};

export type TCitizenshipResponse = {
  citizenship: Array<{
    id: number;
    name: string;
  }>;
};

export type TSelectionResponse = {
  selection: Array<{
    id: number;
    name: string;
  }>;
};

export type TSalaryResponse = {
  salary: Array<{
    id: number;
    name: string;
  }>;
};

export type TEducationHistoryResponse = {
  education_history: Array<{
    id: number;
    name: string;
  }>;
};

export type TCountryResponse = {
  country: Array<{
    id: number;
    name: string;
  }>;
};
