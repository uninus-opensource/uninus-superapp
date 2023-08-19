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
  TCountryResponse,
  TEducationHistoryResponse,
  TDegreeProgramResponse,
  ISelectFacultyRequest,
  ISelectDepartmentRequest,
  TProvinceResponse,
  ICityRequest,
  TCityResponse,
  ISubDistrictRequest,
  TSubDistrictResponse,
  TOccupationResponse,
  TDisabilitiesResponse,
  TYearGraduationResponse,
  ISelectEducationHistoryRequest,
  TScholarshipResponse,
  ICountryRequest,
  TOccupationPositionResponse,
  IOccupationPositionRequest,
  TSchoolTypeResponse,
  TParentStatusResponse,
  ISelectSchoolMajorRequest,
  TSchoolMajorResponse,
  TTotalRegistransResponse,
  TParentEducationResponse,
} from "@uninus/entities";

@Injectable()
export class SelectService {
  constructor(private prisma: PrismaService) {}

  async getProvince({ search, id }: any): Promise<any> {
    const province = await this.prisma.province.findMany({
      where: {
        id: id && Number(id),
        name: {
          ...(search && { contains: search }),
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!province) {
      throw new NotFoundException("Data tidak ditemukan");
    }
    return {
      province,
    };
  }

  async getCity({ province_id, search, id }: ICityRequest): Promise<TCityResponse> {
    const city = await this.prisma.city.findMany({
      where: {
        id: id && Number(id),
        name: {
          ...(search && { contains: search }),
          mode: "insensitive",
        },
        ...(province_id && { province_id: Number(province_id) }),
      },
    });
    if (!city) {
      throw new NotFoundException("Data tidak ditemukan");
    }
    return {
      city,
    };
  }

  async getSubDistrict({
    city_id,
    search,
    id,
  }: ISubDistrictRequest): Promise<TSubDistrictResponse> {
    const subDistrict = await this.prisma.subDistrict.findMany({
      where: {
        id: id && Number(id),
        name: {
          ...(search && { contains: search }),
          mode: "insensitive",
        },
        ...(city_id && { city_id: Number(city_id) }),
      },
    });
    if (!subDistrict) {
      throw new NotFoundException("Data tidak ditemukan");
    }
    return {
      subdistrict: subDistrict,
    };
  }

  async getDegreeProgram({ search, id }: ISelectRequest): Promise<TDegreeProgramResponse> {
    const degreeProgram = await this.prisma.degreeProgram.findMany({
      where: {
        id: id && Number(id),
        name: {
          ...(search && { contains: search }),
          mode: "insensitive",
        },
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
    id,
  }: ISelectFacultyRequest): Promise<TFacultyResponse> {
    const faculty = await this.prisma.faculty.findMany({
      where: {
        id: id && Number(id),
        name: { ...(search && { contains: search }), mode: "insensitive" },
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
    degree_program_id,
    id,
  }: ISelectDepartmentRequest): Promise<TDepartmentResponse> {
    const department = await this.prisma.department.findMany({
      where: {
        id: id && Number(id),
        name: { ...(search && { contains: search }), mode: "insensitive" },
        ...(faculty_id && { faculty_id: Number(faculty_id) }),
        ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
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

  async getReligion({ search, id }: ISelectRequest): Promise<TReligionResponse> {
    const religion = await this.prisma.religion.findMany({
      where: {
        id: id && Number(id),
        name: { ...(search && { contains: search }), mode: "insensitive" },
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

  async getMaritalStatus({ search, id }: ISelectRequest): Promise<TMaritalStatusResponse> {
    const maritalStatus = await this.prisma.maritalStatus.findMany({
      where: {
        id: id && Number(id),
        name: { ...(search && { contains: search }), mode: "insensitive" },
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

  async getGender({ search, id }: ISelectRequest): Promise<TGenderResponse> {
    const gender = await this.prisma.gender.findMany({
      where: {
        id: id && Number(id),
        name: { ...(search && { contains: search }), mode: "insensitive" },
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

  async getCitizenship({ search, id }: ISelectRequest): Promise<TCitizenshipResponse> {
    const citizenship = await this.prisma.citizenship.findMany({
      where: {
        id: id && Number(id),
        name: { ...(search && { contains: search }), mode: "insensitive" },
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

  async getSelectionPath({ search, id }: ISelectRequest): Promise<TSelectionResponse> {
    const selection = await this.prisma.selectionPath.findMany({
      where: {
        id: id && Number(id),
        name: { ...(search && { contains: search }), mode: "insensitive" },
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

  async getSalary({ search, id }: ISelectRequest): Promise<TSalaryResponse> {
    const salary = await this.prisma.salary.findMany({
      where: {
        id: id && Number(id),
        name: { ...(search && { contains: search }), mode: "insensitive" },
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

  async getEducation({
    search,
    npsn,
    id,
  }: ISelectEducationHistoryRequest): Promise<TEducationHistoryResponse> {
    const education = await this.prisma.education.findMany({
      where: {
        id: id && Number(id),
        name: { ...(search && { contains: search }), mode: "insensitive" },
        npsn: { ...(npsn && { contains: npsn }) },
      },
      select: {
        id: true,
        npsn: true,
        name: true,
        province: true,
        sub_district: true,
        district_city: true,
        street_address: true,
      },
    });

    if (!education || education.length === 0) {
      throw new NotFoundException("Data Pendidikan Tidak Ditemukan!");
    }

    return { education };
  }

  async getCountry({ search, citizenship_id, id }: ICountryRequest): Promise<TCountryResponse> {
    const country = await this.prisma.country.findMany({
      where: {
        id: id && Number(id),
        name: { ...(search && { contains: search }), mode: "insensitive" },
        ...(citizenship_id && { citizenship_id: Number(citizenship_id) }),
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!country) {
      throw new NotFoundException("Data Negara Tidak Ditemukan!");
    }

    return { country };
  }

  async getOccupation({ search, id }: ISelectRequest): Promise<TOccupationResponse> {
    const occupation = await this.prisma.occupation.findMany({
      where: {
        id: id && Number(id),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!occupation) {
      throw new NotFoundException("Data Pekerjaan Tidak Ditemukan!");
    }

    return { occupation };
  }

  async getOccupationPosition({
    search,
    occupation_id,
    id,
  }: IOccupationPositionRequest): Promise<TOccupationPositionResponse> {
    const occupationPosition = await this.prisma.occupationPosition.findMany({
      where: {
        id: id && Number(id),
        name: { ...(search && { contains: search }), mode: "insensitive" },
        ...(occupation_id && { occupation_id: Number(occupation_id) }),
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!occupationPosition) {
      throw new NotFoundException("Data Jabatan Tidak Ditemukan!");
    }

    return { occupation_position: occupationPosition };
  }

  async getDisabilites({ search, id }: ISelectRequest): Promise<TDisabilitiesResponse> {
    const disabilities = await this.prisma.disabilities.findMany({
      where: {
        id: id && Number(id),
        name: { ...(search && { contains: search }), mode: "insensitive" },
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

  async getYearGraduate(): Promise<TYearGraduationResponse> {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 40;

    const year = Array.from({ length: currentYear - startYear + 1 }, (_, index) => {
      const year = startYear + index;
      const id = index + 1;
      return { id: +id, name: year };
    });

    return { year };
  }

  async getScholarship({ search, id }: ISelectRequest): Promise<TScholarshipResponse> {
    const scholarship = await this.prisma.scholarship.findMany({
      where: {
        id: id && Number(id),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!scholarship) {
      throw new NotFoundException("Data Beasiswa Tidak Ditemukan!");
    }

    return { scholarship };
  }

  async getEducationType({ search, id }: ISelectRequest): Promise<TSchoolTypeResponse> {
    const education_type = await this.prisma.educationTypes.findMany({
      where: {
        id: id && Number(id),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!education_type) {
      throw new NotFoundException("Data Jenis Sekola Tidak Ditemukan!");
    }

    return { education_type };
  }

  async getParentStatus({ search, id }: ISelectRequest): Promise<TParentStatusResponse> {
    const parentStatus = await this.prisma.parentStatus.findMany({
      where: {
        id: id && Number(id),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!parentStatus) {
      throw new NotFoundException("Data Status Orang Tua Tidak Ditemukan!");
    }

    return { parent_status: parentStatus };
  }

  async getParentEducation({ search, id }: ISelectRequest): Promise<TParentEducationResponse> {
    const parentEducation = await this.prisma.parentEducation.findMany({
      where: {
        id: id && Number(id),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!parentEducation) {
      throw new NotFoundException("Data Status Orang Tua Tidak Ditemukan!");
    }

    return { parent_education: parentEducation };
  }

  async getEducationMajor({
    search,
    education_type_id,
    id,
  }: ISelectSchoolMajorRequest): Promise<TSchoolMajorResponse> {
    const educationMajor = await this.prisma.educationMajor.findMany({
      where: {
        id: id && Number(id),
        name: { ...(search && { contains: search }), mode: "insensitive" },
        ...(education_type_id && { education_type_id: Number(education_type_id) }),
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!educationMajor) {
      throw new NotFoundException("Data Jurusan Sekolah Tidak Ditemukan!");
    }

    return { education_major: educationMajor };
  }

  async getTotalRegistrans(): Promise<TTotalRegistransResponse> {
    const [total_registrans, accepted_registrans] = await Promise.all([
      await this.prisma.users.count({
        select: {
          _all: true,
        },
      }),
      await this.prisma.pMB.findMany({
        where: {
          registration_status: {
            name: {
              contains: "lulus",
              mode: "insensitive",
            },
          },
        },
      }),
    ]);

    if (!accepted_registrans && !total_registrans) {
      throw new NotFoundException("Data tidak ditemukan");
    }

    return {
      total_registrans: total_registrans._all,
      paids: 0,
      unpaids: 0,
      accepted_registrans: accepted_registrans.length,
    };
  }
}
