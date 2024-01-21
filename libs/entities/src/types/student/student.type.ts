import { EOrderByPagination, EStudentFilterBy } from "../../enum";

import { TFIle } from "../file";

export interface IGetStudentRequest {
  id?: string;
}

export interface IStudentData {
  email?: string | null;
  fullname?: string | null;
  firstDepartmentId?: string;
  secondDepartmentId?: string;
  selectionPathId?: string;
  registrationPathId?: string;
  degreeProgramId?: string;
  nik?: string | null;
  nisn?: string | null;
  kk?: string | null;
  genderId?: string;
  religionId?: string;
  birthPlace?: string | null;
  birthDate?: string | null;
  phoneNumber?: string | null;
  citizenshipId?: string;
  maritalStatusId?: string;
  countryId?: string;
  address?: string | null;
  subdistrictId?: string;
  provinceId?: string;
  cityId?: string;
  educationTypeId?: string;
  educationMajorId?: string;
  graduationYear?: string | null;
  educationNpsn?: string | null;
  fatherName?: string | null;
  fatherStatusId?: string;
  fatherEducationId?: string;
  fatherOccupationId?: string;
  fatherPosition?: string | null;
  fatherSalaryId?: string;
  motherName?: string | null;
  motherStatusId?: string;
  motherEducationId?: string;
  motherOccupationId?: string;
  motherPosition?: string | null;
  motherSalaryId?: string;
  guardianName?: string | null;
  guardianStatusId?: string;
  guardianEducationId?: string;
  guardianOccupationId?: string;
  guardianPosition?: string | null;
  guardianSalaryId?: string;
  guardianProvinceId?: string;
  guardianSubdistrictId?: string;
  guardianCityId?: string;
  guardianAddress?: string | null;
  parentProvinceId?: string;
  parentSubdistrictId?: string;
  parentCityId?: string;
  parentAddress?: string | null;
  scholarshipId?: string;
  disabilitiesId?: string;
  facultyId?: string;
  departmentId?: string;
  academicYear?: string | null;
  salaryId?: string;
  occupationId?: string;
  companyName?: string | null;
  companyAddress?: string | null;
  position?: string | null;
  utbkPu?: number | null;
  utbkKk?: number | null;
  utbkPpu?: number | null;
  utbkKmbm?: number | null;
  utbkAverage?: number | null;
  gradeAverage?: number | null;
  registrationStatusId?: string;
  registrationStatus?: string | null;
  utbk?: number | null;
  testScore?: number | null;
  registrationNumber?: string | null;
  payment?: Array<{
    id?: string;
    orderId?: string;
    paymentMethod?: string;
    paymentCode?: string;
    paymentBank?: string;
    isPaid?: boolean;
    amount?: number;
    name?: string;
  }>;
}

export interface IGetStudentResponse extends IStudentData {
  avatar: string | null;
  documents?: Array<{
    id?: string;
    isVerified?: boolean;
    name: string;
    path: string;
  }> | null;
  studentGrade?: Array<{
    id: string;
    subject: string | null;
    semester: string | null;
    grade: number | null;
  }>;
}

export interface IDeleteStudentRequest extends IGetStudentRequest {
  id: string;
}

export type TDeleteStudentResponse = {
  message: string;
};

export interface IUpdateStudentResponse extends IStudentData {
  message?: string;
  avatar?: string | null | TFIle;
  studentGrade?: Array<{
    id?: string;
    subject: string | null;
    semester: string | null;
    grade: number | null;
  }>;
  documents?: Array<{
    id?: string;
    isVerified?: boolean;
    name?: string;
    path?: string;
  }> | null;
}
export interface IUpdateStudentRequest extends IGetStudentRequest, IStudentData {
  educationName?: string | null;
  educationProvince?: string | null;
  educationCity?: string | null;
  educationSubdistrict?: string | null;
  educationAddress?: string | null;
  avatar?: string | null;
  document?: {
    name: string;
    path: string;
  } | null;
  documents?: Array<{
    id?: string;
    isVerified?: boolean;
    name?: string;
    path?: string;
  }> | null;
  studentGrade?: Array<{
    id?: string;
    subject: string | null;
    semester: string | null;
    grade: number | null;
  }>;
}

export interface IUpdateStudentRequestFE extends IStudentData {
  avatar?: string | null;
}

export interface IUpdateStudentGradeResponse extends IStudentData {
  studentGrade: Array<{
    subject: string;
    semester: string;
    grade: number;
  }>;
}
export interface IUpdateStudentGradeRequest extends IStudentData {
  studentGrade: Array<{
    subject: string;
    semester: string;
    grade: number;
  }>;
}

export interface IGetUserMeResponse extends IGetStudentRequest {
  registrationStatus: string | null;
  email: string | null;
  fullname: string | null;
  avatar: string | null;
}

export type TGetUserDataResponse = {
  data: Array<{
    id: string;
    fullname?: string | null;
    role: { id?: number; name?: string };
    email?: string | null;
    password?: string | null;
    phoneNumber?: string | null;
  }>;
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

export type TStudentsPaginationArgs = {
  search?: string;
  orderBy?: EOrderByPagination.ASC | EOrderByPagination.DESC;
  page?: number;
  perPage?: number;
  filterBy?:
    | EStudentFilterBy.FULLNAME
    | EStudentFilterBy.EMAIL
    | EStudentFilterBy.REGISTRATION_STATUS
    | EStudentFilterBy.ACADEMIC_YEAR
    | EStudentFilterBy.GUARDIAN_LECTURER
    | EStudentFilterBy.NIM
    | EStudentFilterBy.STUDENT_STATUS
    | EStudentFilterBy.CREATED_AT;
};
