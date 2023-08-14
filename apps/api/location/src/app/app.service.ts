import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@uninus/api/models";
import {
  ISelectRequest,
  TCountryResponse,
  TProvinceResponse,
  ICityRequest,
  TCityResponse,
  ISubDistrictRequest,
  TSubDistrictResponse,
} from "@uninus/entities";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getProvince({ search }: ISelectRequest): Promise<TProvinceResponse> {
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
  }

  async getCity({ province_id, search }: ICityRequest): Promise<TCityResponse> {
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
  }

  async getSubDistrict({ city_id, search }: ISubDistrictRequest): Promise<TSubDistrictResponse> {
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
      sub_district: subDistrict,
    };
  }

  async getCountry({ search }: ISelectRequest): Promise<TCountryResponse> {
    const country = await this.prisma.country.findMany({
      where: {
        name: { ...(search && { contains: search.toUpperCase() }) },
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
}
