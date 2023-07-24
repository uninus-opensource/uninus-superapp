import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LocationApiService {
  private baseUrl = process.env.BASE_URL;
  private apiKey = process.env.API_KEY;

  async getProvinces(apiKey = this.apiKey) {
    const response = await axios.get(`${this.baseUrl}/provinsi`, {
      headers: {
        'X-API-KEY': apiKey,
      },
    });
    return response.data;
  }

  async getCities(provinsi_id: string, apiKey = this.apiKey) {
    const response = await axios.get(
      `${this.baseUrl}/kota?provinsi_id=${provinsi_id}`,
      {
        headers: {
          'X-API-KEY': apiKey,
        },
      }
    );
    return response.data;
  }

  async getDistrict(kota_id: string, apiKey = this.apiKey) {
    const response = await axios.get(
      `${this.baseUrl}/kecamatan?kota_id=${kota_id}`,
      {
        headers: {
          'X-API-KEY': apiKey,
        },
      }
    );
    return response.data;
  }
}
