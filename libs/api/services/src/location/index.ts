import { BadRequestException, Injectable } from '@nestjs/common';
import { TLocationRequest, TQueryOptionLocation } from '@uninus/entities';
import { PrismaService } from '@uninus/api/models';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async getLocation({ province, city }: TLocationRequest) {
    const queryOptions: TQueryOptionLocation = {};

    if (province) {
      queryOptions.where = { id: Number(province) };
      queryOptions.include = { cities: true };
    }

    if (city) {
      queryOptions.include = {
        cities: {
          where: {
            id: Number(city),
          },
          include: {
            sub_district: true,
          },
        },
      };
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
