import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { PrismaService } from "@uninus/api/services";
import { errorMappings } from "@uninus/api/utilities";
import {
  TCitizenshipResponse,
  TGenderResponse,
  TMaritalStatusResponse,
  TReligionResponse,
  TSalaryResponse,
  ISelectRequest,
  TEducationHistoryResponse,
  TOccupationResponse,
  TDisabilitiesResponse,
  ISelectEducationHistoryRequest,
  TSchoolTypeResponse,
  TParentStatusResponse,
  TParentEducationResponse,
  IEducationMajorRequest,
  TEducationMajorResponse,
  IEducationTypeRequest,
  TCountryResponse,
  TProvinceResponse,
  TCityResponse,
  TSubDistrictResponse,
  TCreateEducationRequest,
  TGeneralResponse,
  ICityRequest,
  ISubDistrictRequest,
  ICountryRequest,
  TUpdateEducationRequest,
  TDeleteEducationRequest,
} from "@uninus/entities";

@Injectable()
export class PersonalService {
  constructor(private prisma: PrismaService) {}
  async getCountry({ search, citizenship_id }: ICountryRequest): Promise<TCountryResponse> {
    try {
      const country = await this.prisma.country.findMany({
        where: {
          name: { ...(search && { contains: search.toUpperCase() }) },
          ...(citizenship_id && { citizenship_id: Number(citizenship_id) }),
        },
        select: {
          id: true,
          name: true,
        },
      });

      if (!country) {
        throw new NotFoundException("Data tidak ditemukan");
      }

      return { country };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getProvince({ search }: ISelectRequest): Promise<TProvinceResponse> {
    try {
      const province = await this.prisma.province.findMany({
        where: {
          name: {
            ...(search && { contains: search.toUpperCase() }),
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
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getCity({ province_id, search }: ICityRequest): Promise<TCityResponse> {
    try {
      const city = await this.prisma.city.findMany({
        where: {
          name: {
            ...(search && { contains: search.toUpperCase() }),
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
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getSubDistrict({ city_id, search }: ISubDistrictRequest): Promise<TSubDistrictResponse> {
    try {
      const subDistrict = await this.prisma.subDistrict.findMany({
        where: {
          name: {
            ...(search && { contains: search.toUpperCase() }),
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
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getReligion({ search }: ISelectRequest): Promise<TReligionResponse> {
    try {
      const religion = await this.prisma.religion.findMany({
        where: {
          name: { ...(search && { contains: search }), mode: "insensitive" },
        },
        select: {
          id: true,
          name: true,
        },
      });

      if (!religion) {
        throw new NotFoundException("Data Agama Tidak Ditemukan!");
      }

      return { religion };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getMaritalStatus({ search }: ISelectRequest): Promise<TMaritalStatusResponse> {
    try {
      const maritalStatus = await this.prisma.maritalStatus.findMany({
        where: {
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
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getGender({ search, id }: ISelectRequest): Promise<TGenderResponse> {
    try {
      const gender = await this.prisma.gender.findMany({
        where: {
          ...(id && { id: Number(id) }),
          name: { ...(search && { contains: search }), mode: "insensitive" },
        },
        select: {
          id: true,
          name: true,
        },
      });

      if (!gender) {
        throw new NotFoundException("Data Jenis Kelamin Tidak Ditemukan!");
      }

      return { gender };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getCitizenship({ search }: ISelectRequest): Promise<TCitizenshipResponse> {
    try {
      const citizenship = await this.prisma.citizenship.findMany({
        where: {
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
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getSalary({ search }: ISelectRequest): Promise<TSalaryResponse> {
    try {
      const salary = await this.prisma.salary.findMany({
        where: {
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
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getOccupation({ search }: ISelectRequest): Promise<TOccupationResponse> {
    try {
      const occupation = await this.prisma.occupation.findMany({
        where: {
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
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getDisabilites({ search }: ISelectRequest): Promise<TDisabilitiesResponse> {
    try {
      const disabilities = await this.prisma.disabilities.findMany({
        where: { name: { ...(search && { contains: search }), mode: "insensitive" } },
        select: {
          id: true,
          name: true,
        },
      });
      if (!disabilities) {
        throw new NotFoundException("Data Disabilitas Tidak Ditemukan!");
      }

      return { disabilities };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getParentStatus({ search }: ISelectRequest): Promise<TParentStatusResponse> {
    try {
      const parentStatus = await this.prisma.parentStatus.findMany({
        where: {
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
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getParentEducation({ search }: ISelectRequest): Promise<TParentEducationResponse> {
    try {
      const parentEducation = await this.prisma.parentEducation.findMany({
        where: {
          name: { ...(search && { contains: search }), mode: "insensitive" },
        },
        select: {
          id: true,
          name: true,
        },
      });

      if (!parentEducation) {
        throw new NotFoundException("Data Pendidikan Orang Tua Tidak Ditemukan!");
      }

      return { parent_education: parentEducation };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getLastEducation({
    search,
    npsn,
  }: ISelectEducationHistoryRequest): Promise<TEducationHistoryResponse> {
    try {
      const education = await this.prisma.education.findMany({
        where: {
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

      return { education: education };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getLastEducationType({
    search,

    degree_program_id,
  }: IEducationTypeRequest): Promise<TSchoolTypeResponse> {
    try {
      const educationTypes = await this.prisma.educationTypes.findMany({
        where: {
          name: { ...(search && { contains: search }), mode: "insensitive" },
          ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
        },
        select: {
          id: true,
          name: true,
        },
      });

      if (!educationTypes) {
        throw new NotFoundException("Data Jenis Sekola Tidak Ditemukan!");
      }

      return { school_type: educationTypes };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getLastEducationMajor({
    search,
    education_type_id,
  }: IEducationMajorRequest): Promise<TEducationMajorResponse> {
    try {
      const schoolMajorTypes = await this.prisma.educationMajor.findMany({
        where: {
          name: { ...(search && { contains: search }), mode: "insensitive" },
          ...(education_type_id && { education_type_id: Number(education_type_id) }),
        },
        select: {
          id: true,
          name: true,
        },
      });

      if (!schoolMajorTypes) {
        throw new NotFoundException("Data Jurusan Sekolah Tidak Ditemukan!");
      }

      return { education_major: schoolMajorTypes };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async createLastEducation(payload: TCreateEducationRequest): Promise<TGeneralResponse> {
    try {
      const newEducation = await this.prisma.education.create({
        data: {
          name: payload.name,
          npsn: payload.npsn,
          district_city: payload.district_city,
          sub_district: payload.sub_district,
          province: payload.province,
          street_address: payload.street_address,
          education_type: {
            connect: {
              id: payload.education_type_id,
            },
          },
        },
      });

      if (!newEducation) {
        throw new BadRequestException("Gagal membuat data sekolah baru");
      }

      return {
        message: "Berhasil menambahkan data sekolah baru",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async updateLastEducation(payload: TUpdateEducationRequest): Promise<TGeneralResponse> {
    try {
      const updatedEducation = await this.prisma.education.update({
        where: {
          id: Number(payload.id),
        },
        data: {
          name: payload.name,
          npsn: payload.npsn,
          district_city: payload.district_city,
          sub_district: payload.sub_district,
          province: payload.province,
          street_address: payload.street_address,
          education_type_id: payload.education_type_id,
        },
      });

      if (!updatedEducation) {
        throw new BadRequestException("Gagal memperbarui data sekolah");
      }

      return {
        message: "Berhasil memperbarui data sekolah",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async deleteLastEducation(payload: TDeleteEducationRequest): Promise<TGeneralResponse> {
    try {
      const deleteEducation = await this.prisma.education.delete({
        where: {
          id: Number(payload.id),
          npsn: payload.npsn,
        },
      });

      if (!deleteEducation) {
        throw new BadRequestException(`Gagal menghapus data sekolah`);
      }

      return {
        message: `Berhasil menghapus data sekolah `,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
}
