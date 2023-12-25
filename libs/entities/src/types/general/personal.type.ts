import { ISelectRequest } from "./pmb.type";
import * as schema from "@uninus/api/models";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export type TCreateEducationRequest = Pick<
  InferInsertModel<typeof schema.lastEducations>,
  "npsn" | "name" | "province"
> & {
  district_city: string;
  sub_district: string;
  street_address: string;
  education_type_id: string;
};
export type TUpdateEducationRequest = Pick<
  InferInsertModel<typeof schema.lastEducations>,
  "id" | "npsn" | "name" | "province"
> & {
  district_city: string;
  sub_district: string;
  street_address: string;
  education_type_id: string;
  id?: string;
};
export type TDeleteEducationRequest = {
  id?: number | string;
  npsn?: string;
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

export type TSchoolTypeResponse = {
  school_type: Array<Omit<InferSelectModel<typeof schema.lastEducationType>, "degreeProgramId">>;
};

export interface IParentStatusRequest {
  search: string;
}

export type TParentStatusResponse = {
  parent_status: Array<InferSelectModel<typeof schema.parentStatus>>;
};

export interface IParentEducationRequest {
  search: string;
}

export type TParentEducationResponse = {
  parent_education: Array<InferSelectModel<typeof schema.parentEducation>>;
};

export interface ISalaryRequest {
  search: string;
}

export type TSalaryResponse = {
  salary: Array<InferSelectModel<typeof schema.salary>>;
};

export type TEducationHistoryResponse = {
  education: Array<
    Pick<InferInsertModel<typeof schema.lastEducations>, "id" | "npsn" | "name" | "province"> & {
      district_city?: string;
      sub_district?: string;
      street_address?: string;
      education_type_id?: string;
    }
  >;
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
  education_major: Array<
    Omit<InferSelectModel<typeof schema.lastEducationMajor>, "lastEducationTypeId">
  >;
};

export interface ICountryRequest extends ISelectRequest {
  citizenship_id: string;
}

export type TCountryResponse = {
  country: Array<Omit<InferSelectModel<typeof schema.country>, "citizenshipId">>;
};

export interface IOccupationRequest {
  search: string;
}

export type TOccupationResponse = {
  occupation: Array<InferSelectModel<typeof schema.occupation>>;
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
  disabilities: Array<InferSelectModel<typeof schema.disabilities>>;
};

export interface IReligionRequest {
  search: string;
}

export type TReligionResponse = {
  religion: Array<InferSelectModel<typeof schema.religion>>;
};

export interface IMaritalStatusRequest {
  search: string;
}

export type TMaritalStatusResponse = {
  maritalStatus: Array<InferSelectModel<typeof schema.maritalStatus>>;
};

export interface IGenderRequest {
  search: string;
}

export type TGenderResponse = {
  gender: Array<InferSelectModel<typeof schema.gender>>;
};

export interface ICitizenshipRequest {
  search: string;
}

export type TCitizenshipResponse = {
  citizenship: Array<InferSelectModel<typeof schema.citizenship>>;
};

export type TProvinceResponse = {
  province: Array<InferSelectModel<typeof schema.religion>>;
};

export interface ICityRequest extends ISelectRequest {
  province_id: string;
}

export type TCityResponse = {
  city: Array<Omit<InferSelectModel<typeof schema.city>, "provinceId">>;
};

export interface ISubDistrictRequest extends ISelectRequest {
  city_id: string;
}

export type TSubDistrictResponse = {
  subdistrict: Array<Omit<InferSelectModel<typeof schema.subdistrict>, "cityId">>;
};

export interface ISelectEducationHistoryRequest extends ISelectRequest {
  npsn: string;
}

export interface IProvinceRequest {}
