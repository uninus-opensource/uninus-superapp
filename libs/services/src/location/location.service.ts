import { Injectable } from '@nestjs/common';
import { LocationApiService } from './location-api.service';
import { Location } from '@uninus/entities';
import { LocationApiResponse } from '@uninus/entities';

@Injectable()
export class LocationService {
  constructor(private readonly locationApiService: LocationApiService) {}

  async getProvinces(): Promise<Location[]> {
    const apiResponse: LocationApiResponse =
      await this.locationApiService.getProvinces();

    if (!Array.isArray(apiResponse.data) || apiResponse.data.length === 0) {
      throw new Error('Invalid data format for provinces');
    }

    const provinces: Location[] = apiResponse.data.map((provinceData) => ({
      province: provinceData.name,
      city: '',
      district: '',
    }));

    return provinces;
  }
}
