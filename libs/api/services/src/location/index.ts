import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@uninus/api/models';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async getLocation(province: string, city: string) {
    const queryOptions: any = {};

    if (province) {
      queryOptions.where = { id: parseInt(province) };
      queryOptions.include = { cities: {} };
    }

    if (city) {
      queryOptions.include.cities.where = { id: parseInt(city) };
      queryOptions.include.cities.include = { sub_district: {} };
    }

    const location = await this.prisma.province.findMany(queryOptions);

    if (!location) {
      throw new BadRequestException('Data tidak ditemukan', {
        cause: new Error(),
      });
    }

    return {
      province: location,
    };
  }
}
