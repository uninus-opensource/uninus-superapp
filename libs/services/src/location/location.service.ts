import { Injectable } from '@nestjs/common';
import { LocationApiService } from './location-api.service';
import { Location, LocationApiResponse } from '@uninus/entities';
import { PrismaService } from '@uninus/models';

@Injectable()
export class LocationService {
  constructor(
    private readonly locationApiService: LocationApiService,
    private readonly prisma: PrismaService
  ) {}

  async getProvinces(): Promise<Location[]> {
    const apiResponse: LocationApiResponse =
      await this.locationApiService.getProvinces();

    if (!Array.isArray(apiResponse.data) || apiResponse.data.length === 0) {
      throw new Error('Invalid data format for provinces');
    }

    const provinces: Location[] = apiResponse.data.map((provinceData) => ({
      id: provinceData.id,
      name: provinceData.name,
    }));

    for (const province of provinces) {
      await this.prisma.province.create({
        data: {
          apiId: parseInt(province.id!),
          name: province.name,
        },
      });
    }

    return provinces;
  }

  async getCities(provinsi_id: string): Promise<Location[]> {
    const apiResponse: LocationApiResponse =
      await this.locationApiService.getCities(provinsi_id);

    if (!Array.isArray(apiResponse.data) || apiResponse.data.length === 0) {
      throw new Error('Invalid data format for cities');
    }

    const cities: Location[] = apiResponse.data.map((cityData) => ({
      id: cityData.id,
      name: cityData.name,
    }));

    const province = await this.prisma.province.findFirst({
      where: { apiId: parseInt(provinsi_id) },
    });

    if (!province) {
      throw new Error('Province not found');
    }

    for (const city of cities) {
      const type = city.name.startsWith('KAB') ? 'KAB' : 'KOTA';

      try {
        await this.prisma.city.upsert({
          where: { apiId: parseInt(city.id!) },
          update: { name: city.name, provinceId: province.apiId, type: type },
          create: {
            apiId: parseInt(city.id!),
            name: city.name,
            provinceId: province.apiId,
            type: type,
          },
        });

        console.log(`Upserted city: ${city.name}`);
      } catch (error) {
        console.error(`Failed to upsert city: ${city.name}`);
        console.error(error);
      }
    }

    return cities;
  }

  async getDistricts(kota_id: string): Promise<Location[]> {
    const apiResponse: LocationApiResponse =
      await this.locationApiService.getDistrict(kota_id);

    if (!Array.isArray(apiResponse.data) || apiResponse.data.length === 0) {
      throw new Error('Invalid data format for districts');
    }

    const districts: Location[] = apiResponse.data.map((districtData) => ({
      id: districtData.id,
      name: districtData.name,
    }));

    const city = await this.prisma.city.findFirst({
      where: { apiId: parseInt(kota_id) },
    });

    if (!city) {
      throw new Error('City not found');
    }

    for (const district of districts) {
      try {
        await this.prisma.district.upsert({
          where: { apiId: parseInt(district.id!) },
          update: { name: district.name, cityId: city.apiId },
          create: {
            apiId: parseInt(district.id!),
            name: district.name,
            cityId: city.apiId,
          },
        });
        console.log(`Upserted district: ${district.name}`);
      } catch (error) {
        console.error(`Failed to upsert city: ${city.name}`);
        console.error(error);
      }
    }
    return districts;
  }
}
