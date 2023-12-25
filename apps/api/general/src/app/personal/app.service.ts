import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
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
import * as schema from "@uninus/api/models";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { and, eq, ilike, or } from "drizzle-orm";

@Injectable()
export class PersonalService {
  constructor(@Inject("drizzle") private drizzle: NodePgDatabase<typeof schema>) {}
  async getCountry({ search, citizenship_id }: ICountryRequest): Promise<TCountryResponse> {
    try {
      const country = await this.drizzle
        .select({
          name: schema.country.name,
          id: schema.country.id,
        })
        .from(schema.country)
        .where(
          and(
            ilike(schema.country.name, `%${search || ""}%`),
            ilike(schema.country.citizenshipId, `%${citizenship_id || ""}%`),
          ),
        );
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
      const province = await this.drizzle
        .select({
          name: schema.province.name,
          id: schema.province.id,
        })
        .from(schema.province)
        .where(ilike(schema.province.name, `%${search || ""}%`));
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
      const city = await this.drizzle
        .select({
          name: schema.city.name,
          id: schema.city.id,
        })
        .from(schema.city)
        .where(
          and(
            ilike(schema.city.name, `%${search || ""}%`),
            ilike(schema.city.provinceId, `%${province_id || ""}%`),
          ),
        );
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
      const subdistrict = await this.drizzle
        .select({
          name: schema.subdistrict.name,
          id: schema.subdistrict.id,
        })
        .from(schema.subdistrict)
        .where(
          and(
            ilike(schema.subdistrict.name, `%${search || ""}%`),
            ilike(schema.subdistrict.cityId, `%${city_id || ""}%`),
          ),
        );
      if (!subdistrict) {
        throw new NotFoundException("Data tidak ditemukan");
      }
      return {
        subdistrict,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getReligion({ search }: ISelectRequest): Promise<TReligionResponse> {
    try {
      const religion = await this.drizzle
        .select()
        .from(schema.religion)
        .where(ilike(schema.religion.name, `%${search || ""}%`));

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
      const maritalStatus = await this.drizzle
        .select()
        .from(schema.maritalStatus)
        .where(ilike(schema.maritalStatus.name, `%${search || ""}%`));

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
      const gender = await this.drizzle
        .select()
        .from(schema.gender)
        .where(
          and(
            ilike(schema.gender.name, `%${search || ""}%`),
            ilike(schema.gender.id, `%${id || ""}%`),
          ),
        );

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
      const citizenship = await this.drizzle
        .select()
        .from(schema.citizenship)
        .where(ilike(schema.citizenship.name, `%${search || ""}%`));

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
      const salary = await this.drizzle
        .select()
        .from(schema.salary)
        .where(ilike(schema.salary.name, `%${search || ""}%`));

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
      const occupation = await this.drizzle
        .select()
        .from(schema.occupation)
        .where(ilike(schema.occupation.name, `%${search || ""}%`));
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
      const disabilities = await this.drizzle
        .select()
        .from(schema.disabilities)
        .where(ilike(schema.disabilities.name, `%${search || ""}%`));
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
      const parentStatus = await this.drizzle
        .select()
        .from(schema.parentStatus)
        .where(ilike(schema.parentStatus.name, `%${search || ""}%`));
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
      const parentEducation = await this.drizzle
        .select()
        .from(schema.parentEducation)
        .where(ilike(schema.parentEducation.name, `%${search || ""}%`));

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
      const education = await this.drizzle
        .select()
        .from(schema.lastEducations)
        .where(
          and(
            ilike(schema.lastEducations.name, `%${search || ""}%`),
            ilike(schema.lastEducations.npsn, `%${npsn || ""}%`),
          ),
        );

      if (!education || education.length === 0) {
        throw new NotFoundException("Data Pendidikan Tidak Ditemukan!");
      }

      return { education };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getLastEducationType({
    search,
    degree_program_id,
  }: IEducationTypeRequest): Promise<TSchoolTypeResponse> {
    try {
      const educationTypes = await this.drizzle
        .select({
          id: schema.lastEducationType.id,
          name: schema.lastEducationType.name,
        })
        .from(schema.lastEducationType)
        .where(
          and(
            ilike(schema.lastEducationType.name, `%${search || ""}%`),
            ilike(schema.lastEducationType.degreeProgramId, `%${degree_program_id || ""}%`),
          ),
        );
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
      const schoolMajorTypes = await this.drizzle
        .select({
          id: schema.lastEducationMajor.id,
          name: schema.lastEducationMajor.name,
        })
        .from(schema.lastEducationMajor)
        .where(
          and(
            ilike(schema.lastEducationMajor.name, `%${search || ""}%`),
            ilike(schema.lastEducationMajor.lastEducationTypeId, `%${education_type_id || ""}%`),
          ),
        );

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
      const newEducation = await this.drizzle.insert(schema.lastEducations).values({
        npsn: payload.npsn,
        name: payload.name,
        province: payload.province,
        city: payload.district_city,
        subdistrict: payload.sub_district,
        streetAddress: payload.street_address,
        lastEducationTypeId: payload.education_type_id,
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
      const updatedEducation = await this.drizzle
        .update(schema.lastEducations)
        .set({
          npsn: payload.npsn,
          name: payload.name,
          province: payload.province,
          city: payload.district_city,
          subdistrict: payload.sub_district,
          streetAddress: payload.street_address,
          lastEducationTypeId: payload.education_type_id,
        })
        .where(eq(schema.lastEducations.id, payload.id));

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
      const deleteEducation = await this.drizzle
        .delete(schema.lastEducations)
        .where(
          or(
            ilike(schema.lastEducations.id, String(payload.id)),
            ilike(schema.lastEducations.npsn, payload.npsn),
          ),
        );

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
