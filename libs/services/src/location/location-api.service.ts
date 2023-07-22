import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LocationApiService {
  private baseUrl = process.env.BASE_URL;
  private apiKey = process.env.API_KEY;

  async getProvinces(apiKey = this.apiKey) {
    console.log(apiKey);
    const response = await axios.get(`${this.baseUrl}/provinsi`, {
      headers: {
        'X-API-KEY': apiKey,
      },
    });
    console.log('API RESPONSE:', response.data);
    return response.data;
  }
}
