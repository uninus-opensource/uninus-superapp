import { ISelectRequest } from "./pmb.type";
import * as schema from "@uninus/api/models";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export type TCreateEducationRequest = InferInsertModel<typeof schema.educations>;
export type TUpdateEducationRequest = TCreateEducationRequest & Pick<TDeleteEducationRequest, "id">;
export type TDeleteEducationRequest = {
  id?: number | string;
  npsn?: string;
};

export interface IYearGraduationRequest {
  search: string;
}

export type TYearGraduationResponse = Array<{
  id: number;
  name: number;
}>;

export type TSchoolTypeResponse = Array<
  Omit<InferSelectModel<typeof schema.educationType>, "degreeProgramId">
>;
export interface IParentStatusRequest {
  search: string;
}

export type TParentStatusResponse = Array<InferSelectModel<typeof schema.parentStatus>>;

export interface IParentEducationRequest {
  search: string;
}

export type TParentEducationResponse = Array<InferSelectModel<typeof schema.parentEducation>>;

export interface ISalaryRequest {
  search: string;
}

export type TSalaryResponse = Array<InferSelectModel<typeof schema.salary>>;

export type TEducationHistoryResponse = Array<InferSelectModel<typeof schema.educations>>;

export interface IEducationTypeRequest extends ISelectRequest {
  degreeProgramId: string;
}

export type TEducationTypeResponse = Array<{
  id: number;
  name: string;
}>;

export interface IEducationMajorRequest extends ISelectRequest {
  search: string;
  educationTypeId: string;
}

export type TEducationMajorResponse = Array<
  Omit<InferSelectModel<typeof schema.educationMajor>, "educationTypeId">
>;

export interface ICountryRequest extends ISelectRequest {
  citizenshipId: string;
}

export type TCountryResponse = Array<
  Omit<InferSelectModel<typeof schema.country>, "citizenshipId">
>;
export interface IOccupationRequest {
  search: string;
}

export type TOccupationResponse = Array<InferSelectModel<typeof schema.occupation>>;

export interface IOccupationPositionRequest extends ISelectRequest {
  occupationId: string;
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

export type TDisabilitiesResponse = Array<InferSelectModel<typeof schema.disabilities>>;

export interface IReligionRequest {
  search: string;
}

export type TReligionResponse = Array<InferSelectModel<typeof schema.religion>>;

export interface IMaritalStatusRequest {
  search: string;
}

export type TMaritalStatusResponse = Array<InferSelectModel<typeof schema.maritalStatus>>;

export interface IGenderRequest {
  search: string;
}

export type TGenderResponse = Array<InferSelectModel<typeof schema.gender>>;

export interface ICitizenshipRequest {
  search: string;
}

export type TCitizenshipResponse = Array<InferSelectModel<typeof schema.citizenship>>;

export type TProvinceResponse = Array<InferSelectModel<typeof schema.religion>>;

export interface ICityRequest extends ISelectRequest {
  provinceId: string;
}

export type TCityResponse = Array<Omit<InferSelectModel<typeof schema.city>, "provinceId">>;

export interface ISubDistrictRequest extends ISelectRequest {
  cityId: string;
}

export type TSubDistrictResponse = Array<
  Omit<InferSelectModel<typeof schema.subdistrict>, "cityId">
>;

export interface ISelectEducationHistoryRequest extends ISelectRequest {
  npsn: string;
}

export interface IProvinceRequest {}
