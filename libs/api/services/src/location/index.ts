import { NotFoundException, Injectable } from '@nestjs/common';
import {
  TProvinceResponse,
  ICityRequest,
  TCityResponse,
  TSubDistrictResponse,
  ISubDistrictRequest,
  IProvinceRequest,
} from '@uninus/entities';
import { PrismaService } from '@uninus/api/models';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async getProvince({ search }: IProvinceRequest): Promise<TProvinceResponse> {
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
      throw new NotFoundException('Data tidak ditemukan');
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
        province_id: Number(province_id),
      },
    });
    if (!city) {
      throw new NotFoundException('Data tidak ditemukan');
    }
    return {
      city,
    };
  }

  async getSubDistrict({
    city_id,
    search,
  }: ISubDistrictRequest): Promise<TSubDistrictResponse> {
    const subDistrict = await this.prisma.subDistrict.findMany({
      where: {
        name: {
          ...(search && { contains: search.toUpperCase() }),
        },
        city_id: Number(city_id),
      },
    });
    if (!subDistrict) {
      throw new NotFoundException('Data tidak ditemukan');
    }
    return {
      sub_district: subDistrict,
    };
  }
}
