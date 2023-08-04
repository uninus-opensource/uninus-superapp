import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@uninus/api/models";
import {
  TCitizenshipResponse,
  TDepartmentResponse,
  TFacultyResponse,
  TGenderResponse,
  TMaritalStatusResponse,
  TReligionResponse,
  TSalaryResponse,
  TSelectionResponse,
  ISelectRequest,
  TEducationHistoryResponse,
  TDegreeProgramResponse,
  ISelectFacultyRequest,
  ISelectDepartmentRequest,
  TOccupationResponse,
  TDisabilitiesResponse,
} from "@uninus/entities";

@Injectable()
export class GeneralService {
  constructor(private prisma: PrismaService) {}

  async getDegreeProgram({ search }: ISelectRequest): Promise<TDegreeProgramResponse> {
    const degreeProgram = await this.prisma.degreeProgram.findMany({
      where: {
        name: { ...(search && { contains: search.toUpperCase() }) },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!degreeProgram) {
      throw new NotFoundException("Data Fakultas Tidak Ditemukan!");
    }

    return { degree_program: degreeProgram };
  }

  async getFaculty({
    search,
    degree_program_id,
  }: ISelectFacultyRequest): Promise<TFacultyResponse> {
    const faculty = await this.prisma.faculty.findMany({
      where: {
        name: { ...(search && { contains: search.toUpperCase() }) },
        ...(degree_program_id && {
          degreeProgram_id: Number(degree_program_id),
        }),
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!faculty) {
      throw new NotFoundException("Data Fakultas Tidak Ditemukan!");
    }

    return { faculty };
  }

  async getDepartment({
    search,
    faculty_id,
  }: ISelectDepartmentRequest): Promise<TDepartmentResponse> {
    const department = await this.prisma.department.findMany({
      where: {
        name: { ...(search && { contains: search.toUpperCase() }) },
        ...(faculty_id && { faculty_id: Number(faculty_id) }),
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!department) {
      throw new NotFoundException("Data Program Studi Tidak Ditemukan!");
    }

    return { department };
  }

  async getReligion({ search }: ISelectRequest): Promise<TReligionResponse> {
    const religion = await this.prisma.religion.findMany({
      where: {
        name: { ...(search && { contains: search.toUpperCase() }) },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!religion) {
      throw new NotFoundException("Data Religion Tidak Ditemukan!");
    }

    return { religion };
  }

  async getMaritalStatus({ search }: ISelectRequest): Promise<TMaritalStatusResponse> {
    const maritalStatus = await this.prisma.maritalStatus.findMany({
      where: {
        name: { ...(search && { contains: search.toUpperCase() }) },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!maritalStatus) {
      throw new NotFoundException("Data Status Pernikahan Tidak Ditemukan!");
    }

    return { maritalStatus };
  }

  async getGender({ search }: ISelectRequest): Promise<TGenderResponse> {
    const gender = await this.prisma.gender.findMany({
      where: {
        name: { ...(search && { contains: search.toUpperCase() }) },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!gender) {
      throw new NotFoundException("Data Gender Tidak Ditemukan!");
    }

    return { gender };
  }

  async getCitizenship({ search }: ISelectRequest): Promise<TCitizenshipResponse> {
    const citizenship = await this.prisma.citizenship.findMany({
      where: {
        name: { ...(search && { contains: search.toUpperCase() }) },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!citizenship) {
      throw new NotFoundException("Data Kewarganegaraan Tidak Ditemukan!");
    }

    return { citizenship };
  }

  async getSelectionPath({ search }: ISelectRequest): Promise<TSelectionResponse> {
    const selection = await this.prisma.selectionPath.findMany({
      where: {
        name: { ...(search && { contains: search.toUpperCase() }) },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!selection) {
      throw new NotFoundException("Data Jalur Seleksi Tidak Ditemukan!");
    }

    return { selection };
  }

  async getSalary({ search }: ISelectRequest): Promise<TSalaryResponse> {
    const salary = await this.prisma.salary.findMany({
      where: {
        name: { ...(search && { contains: search.toUpperCase() }) },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!salary) {
      throw new NotFoundException("Data Gaji Tidak Ditemukan!");
    }

    return { salary };
  }

  async getEducationHistory({ search }: ISelectRequest): Promise<TEducationHistoryResponse> {
    const educationHistory = await this.prisma.educationHistory.findMany({
      where: {
        name: { ...(search && { contains: search.toUpperCase() }) },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!educationHistory) {
      throw new NotFoundException("Data Pendidikan Tidak Ditemukan!");
    }

    return { education_history: educationHistory };
  }

  async getOccupation({ search }: ISelectRequest): Promise<TOccupationResponse> {
    const occupation = await this.prisma.occupation.findMany({
      where: {
        name: { ...(search && { contains: search.toUpperCase() }) },
      },
      select: {
        id: true,
        name: true,
        occupationposition: true,
      },
    });
    if (!occupation) {
      throw new NotFoundException("Data Pekerjaan Tidak Ditemukan!");
    }

    return { occupation };
  }

  async getDisabilites({ search }: ISelectRequest): Promise<TDisabilitiesResponse> {
    const disabilities = await this.prisma.disabilities.findMany({
      where: {
        name: { ...(search && { contains: search.toUpperCase() }) },
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!disabilities) {
      throw new NotFoundException("Data Disabilitas Tidak Ditemukan!");
    }

    return { disabilities };
  }
}
