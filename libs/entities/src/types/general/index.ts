import { Prisma } from "@prisma/client";

export interface ISelectRequest {
  search?: string;
  id?: number;
}

export interface ISelectEducationHistoryRequest extends ISelectRequest {
  npsn: string;
}

export interface IProvinceRequest {
  search: string;
}

export interface ISelectFacultyRequest extends ISelectRequest {
  degree_program_id: string;
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
  subdistrict: Array<{
    id: number;
    name: string;
  }>;
};
export type TRolesResponse = Array<{
  id: number;
  name: string;
}>;
export interface IDegreeProgramRequest {
  search: string;
}

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

export interface ISelectDepartmentRequest extends ISelectRequest {
  degree_program_id: string;
  faculty_id: string;
}

export type TDepartmentResponse = {
  department: Array<{
    id: number;
    name: string;
  }>;
};

export interface IReligionRequest {
  search: string;
}

export type TReligionResponse = {
  religion: Array<{
    id: number;
    name: string;
  }>;
};

export interface IMaritalStatusRequest {
  search: string;
}

export type TMaritalStatusResponse = {
  maritalStatus: Array<{
    id: number;
    name: string;
  }>;
};

export interface IGenderRequest {
  search: string;
}

export type TGenderResponse = {
  gender: Array<{
    id: number;
    name: string;
  }>;
};

export interface ICitizenshipRequest {
  search: string;
}

export type TCitizenshipResponse = {
  citizenship: Array<{
    id: number;
    name: string;
  }>;
};

export interface ISelectionRequest extends ISelectRequest {
  degree_program_id: string;
}

export type TSelectionResponse = {
  selection: Array<{
    id: number;
    name: string;
  }>;
};

export interface ISalaryRequest {
  search: string;
}

export type TSalaryResponse = {
  salary: Array<{
    id: number;
    name: string;
  }>;
};

export type TEducationHistoryResponse = {
  education: Array<{
    id: number;
    npsn: string;
    name: string;
    province: string;
    district_city: string;
    sub_district: string;
    street_address: string;
  }>;
};

export interface IEducationTypeRequest extends ISelectRequest {
  degree_program_id: string;
}

export type TEducationTypeResponse = {
  school_type: Array<{
    id: number;
    name: string;
  }>;
};

export interface IEducationMajorRequest extends ISelectRequest {
  search: string;
  education_type_id: string;
}

export type TEducationMajorResponse = {
  education_major: Array<{
    id: number;
    name: string;
  }>;
};

export interface ICountryRequest extends ISelectRequest {
  citizenship_id: string;
}

export type TCountryResponse = {
  country: Array<{
    id: number;
    name: string;
  }>;
};

export interface IOccupationRequest {
  search: string;
}

export type TOccupationResponse = {
  occupation: Array<{
    id: number;
    name: string;
  }>;
};

export interface IOccupationPositionRequest extends ISelectRequest {
  occupation_id: string;
}

export type TOccupationPositionResponse = {
  occupation_position: Array<{
    id: number;
    name: string;
  }>;
};

export interface IDisabilitiesRequest {
  search: string;
}

export type TDisabilitiesResponse = {
  disabilities: Array<{
    id: number;
    name: string;
  }>;
};

export interface IYearGraduationRequest {
  search: string;
}

export type TYearGraduationResponse = {
  year: Array<{
    id: number;
    name: number;
  }>;
};

export interface IScholarshipRequest {
  search: string;
}

export type TScholarshipResponse = {
  scholarship: Array<{
    id: number;
    name: string;
  }>;
};

export type TSchoolTypeResponse = {
  school_type: Array<{
    id: number;
    name: string;
  }>;
};

export interface IParentStatusRequest {
  search: string;
}

export type TParentStatusResponse = {
  parent_status: Array<{
    id: number;
    name: string;
  }>;
};

export interface IParentEducationRequest {
  search: string;
}

export type TParentEducationResponse = {
  parent_education: Array<{
    id: number;
    name: string;
  }>;
};

export type TTotalRegistransResponse = {
  total_registrans: number;
  paids: number;
  unpaids: number;
  accepted_registrans: number;
};

export interface IRegistransRequest {
  filter_type?: string;
  start_date?: string;
  end_date?: string;
}

export type TInterestEducationPrograms = {
  data: Array<{
    name: string;
    total: number;
  }>;
};

export interface IInterestEducationPrograms {
  filter_type?: string;
}

export type TInterestDepartmentResponse = {
  kpi?: number;
  pai?: number;
  pgmi?: number;
  pbs?: number;
  akuntansi?: number;
  manajemen?: number;
  iHukum?: number;
  iKomunikasi?: number;
  iPerpustakaan?: number;
  pba?: number;
  pbsi?: number;
  pbing?: number;
  pgpaud?: number;
  plb?: number;
  pls?: number;
  pmath?: number;
  ppkn?: number;
  agrotek?: number;
  te?: number;
  tif?: number;
  ti?: number;
  mAdmPendidikan?: number;
  mPai?: number;
  mIHukum?: number;
  dIPendidikan?: number;
};

export interface IInterestDepartment {
  filter_type?: string;
  degree_program_id?: number;
}

export type TRegistrationStatusResponse = {
  registration_status: Array<{
    id: number;
    name: string;
  }>;
};

export type TStudentsPaginationArgs = {
  where?: Prisma.PMBWhereInput;
  orderBy?: Prisma.PMBOrderByWithRelationInput;
  page?: number;
  perPage?: number;
};

export type TStudentsPaginatonResponse = {
  data: Array<object>;
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev?: null | number;
    next?: null | number;
  };
};
