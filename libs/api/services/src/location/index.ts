import { NotFoundException, Injectable } from '@nestjs/common';
import {
  TProvinceResponse,
  TCityRequest,
  TCityResponse,
  TSubDistrictResponse,
  TSubDistrictRequest,
} from '@uninus/entities';
import { PrismaService } from '@uninus/api/models';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async getProvince(): Promise<TProvinceResponse> {
    const province = await this.prisma.province.findMany({
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

  async getCity({ id }: TCityRequest): Promise<TCityResponse> {
    const city = await this.prisma.city.findMany({
      where: {
        province_id: Number(id),
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
    id,
  }: TSubDistrictRequest): Promise<TSubDistrictResponse> {
    const subDistrict = await this.prisma.subDistrict.findMany({
      where: {
        city_id: Number(id),
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
