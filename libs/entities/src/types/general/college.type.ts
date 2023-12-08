import { ISelectRequest } from "./pmb.type";

export interface IDegreeProgramRequest {
  search: string;
}

export type TDegreeProgramResponse = {
  degree_program: Array<{
    id: number;
    name: string;
  }>;
};

export type TUpdateDepartmentRequest = {
  id?: number;
  name: string;
  faculty_id?: number;
  degree_program_id?: number;
};

export type TCreateDepartmentRequest = {
  name: string;
  faculty_id: number;
  degree_program_id: number;
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

export type TCreateFacultyRequest = {
  name: string;
  degree_program_id: number;
};

export type TUpdateFacultyRequest = {
  id?: number;
  name: string;
  degree_program_id?: number;
};
export type TFacultyResponse = {
  faculty: Array<{
    id: number;
    name: string;
  }>;
};

export interface ISelectFacultyRequest extends ISelectRequest {
  degree_program_id: string;
}

export interface IGetCurriculumByIdResponse
  extends Omit<ICreateCurriculumRequest, "degree_program_id" | "faculty_id" | "department_id"> {
  degree_program: {
    id: number;
    name: string;
  };
  faculty: {
    id: number;
    name: string;
  };
  department: {
    id: number;
    name: string;
  };
}

export interface IGetCurriculumResponse extends Array<IGetCurriculumByIdResponse> {}

export interface ICreateCurriculumRequest {
  name: string;
  degree_program_id: number;
  faculty_id: number;
  department_id: number;
  batch: string;
  release_year: string;
  in_effect: string;
}

export interface ICreateCurriculumResponse {
  message: string;
}

export interface IUpdateCurriculumRequest extends ICreateCurriculumRequest {
  id?: string;
  status?: string;
}

export interface IUpdateCurriculumResponse extends ICreateCurriculumResponse {}

export interface IDeleteCurriculumResponse extends ICreateCurriculumResponse {}

export interface IGetCoursesResponse extends Array<IGetCourseByIdResponse> {}

export interface IGetCourseByIdResponse
  extends Omit<ICreateCourseRequest, "curriculum_id" | "category_id" | "course_type_id"> {
  curriculum: {
    name: string;
    batch: string;
    release_year: string;
    in_effect: string;
    degree_program: {
      id: number;
      name: string;
    };
    faculty: {
      id: number;
      name: string;
    };
    department: {
      id: number;
      name: string;
    };
  };
  category: {
    id: number;
    name: string;
  };
  course_type: {
    id: number;
    name: string;
  };
}

export interface ICreateCourseRequest {
  name: string;
  course_code: string;
  curriculum_id: string;
  category_id: number;
  course_type_id: number;
  credit: number;
  semester: number;
}

export interface ICreateCourseResponse extends ICreateCurriculumResponse {}

export interface IUpdateCourseRequest extends ICreateCourseRequest {
  id?: string;

  status?: string;
}

export interface IUpdateCourseResponse extends ICreateCurriculumResponse {}

export interface IDeleteCourseResponse extends ICreateCurriculumResponse {}

export interface ICreateCourseScheduleRequest {
  semester: number;
  class: string;
  course_id: string;
  schedule_id: string;
  capacity: number;
  total_students: number;
}

export interface ICreateCourseScheduleResponse extends ICreateCurriculumResponse {}

export interface IUpdateCourseScheduleRequest extends ICreateCourseScheduleRequest {
  id?: string;
}

export interface IUpdateCourseScheduleResponse extends ICreateCurriculumResponse {}

export interface IDeleteCourseScheduleResponse extends ICreateCurriculumResponse {}

export interface IGetCourseScheduleIdResponse
  extends Omit<IUpdateCourseScheduleRequest, "course_id" | "schedule_id"> {
  course: {
    id: string;
    name: string;
  };
  schedule: {
    id: string;
    day: string;
    start_time: string;
    end_time: string;
  };
}

export class IGetCourseScheduleResponse extends Array<IGetCourseScheduleIdResponse> {}
